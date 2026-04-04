import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { UserRole } from '../constant/roles';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Login, Register, Token } from '../models/auth.models';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private http = inject(HttpClient);
  private route = inject(Router);
  private token!: Token;
  private getError!: string;
  readonly loading = signal<boolean>(false);

  private user = signal<User | null | undefined>(null);

  // register
  register(data: Register): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`, data).pipe(
      tap((result) => console.log('Registered', result)),

      catchError((err) => {
        this.getError = err?.error?.message;
        console.log(this.getError);
        return throwError(() => err);
      }),
    );
  }

  // login
  login(data: Login): Observable<Token> {
    // console.log(data);
    this.loading.set(true);

    return this.http.post<Token>(`${this.apiUrl}/login`, data).pipe(
      tap((token) => {
        this.token = token;
        const tokenString = this.token.token;

        if (!tokenString) {
          throw new Error(
            'Login response did not include a valid token Or token is null',
          );
        }

        // console.log(token);
        localStorage.setItem('token', tokenString);
      }),

      catchError((err) => {
        this.getError = err?.error?.message ?? err.message ?? 'Unknown error';
        // console.log(this.getError);
        return throwError(() => err);
      }),
      finalize(() => this.loading.set(false)),
    );
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
  // get user
  getMe() {
    return this.http.get<User>(`${this.apiUrl}/me`).pipe(
      tap((user) => {
        // console.log(user);
        this.user.set(user);
      }),
      catchError((err) => {
        this.getError = err.error?.message;
        return throwError(() => err);
      }),
    );
  }

  hasRole() {
    return this.user()?.role;
  }
  // redirect after login
  redirectAfterLogin() {
    const userRole = this.hasRole();
    // console.log(userRole);
    if (userRole === UserRole.CANDIDAT) {
      return this.route.navigate(['/candidat']);
    } else if (userRole === UserRole.RECRUTER) {
      return this.route.navigate(['/recruiter']);
    } else if (userRole === UserRole.ADMIN) {
      return this.route.navigate(['/admin']);
    }
    return;
  }

  logout(): void {
    this.token = null!;
    this.user.set(null);
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
  error() {
    return this.getError;
  }
}
