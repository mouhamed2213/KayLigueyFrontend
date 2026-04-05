import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { UserRole } from '../constant/roles';
import { catchError, finalize, map } from 'rxjs/operators';
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
  private user = signal<User | null | undefined>(undefined);

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
        // this.isAuthenticated();
      }),

      catchError((err) => {
        this.getError = err?.error?.message ?? err.message ?? 'Unknown error';
        // console.log(this.getError);
        return throwError(() => err);
      }),
      finalize(() => this.loading.set(false)),
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000 > Date.now(); // conver second (exp) to miiilisecond
      return exp;
    } catch {
      return false;
    }
  }
  // get user
  getMe(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`).pipe(
      tap((user) => {
        this.user.set(user);
        console.log(this.user()?.role);
      }),
      catchError((err) => {
        this.user.set(null);
        this.getError = err.error?.message;
        return throwError(() => err);
      }),
    );
  }
  userRole = computed(() => this.user()?.role);

  hasRole() {
    return this.userRole();
  }

  // redirect after login
  redirectAfterLogin() {
    const userRole = this.hasRole();
    console.log(userRole);

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
