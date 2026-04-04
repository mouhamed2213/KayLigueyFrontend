import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { UserRole } from '../constant/roles';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private http = inject(HttpClient);
  private route = inject(Router);
  private token!: string;

  private getError: string = '';
  private load: boolean = false;

  user = signal<any | null | undefined>(''); // create user model
  // register
  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data).pipe(
      tap({
        // get error from the API
        error: (err) => {
          this.getError = err.error.message;
          console.log(this.getError);
        },
      }),
    );
  }

  // login
  login(data: any): Observable<string> {
    // console.log(data);
    return this.http.post<any>(`${this.apiUrl}/login`, data).pipe(
      tap((jwtToken) => {
        this.token = jwtToken.token;
        localStorage.setItem('token', this.token);
      }),

      catchError((err) => {
        this.getError = err?.error?.message ?? err.message ?? 'Unknown error';
        console.log(this.getError);
        return throwError(() => err);
      }),
    );
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
  // get user
  getMe() {
    return this.http.get<any>(`${this.apiUrl}/me`).pipe(
      tap((user) => {
        // console.log(user);
        this.user.set(user);
      }),
      catchError((err) => {
        this.error = err.error?.message;
        return throwError(() => err);
      }),
    );
  }

  hasRole() {
    return this.user().role;
  }
  // redirect after login
  redirectAfterLogin() {
    const userRole: UserRole = this.hasRole();
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

  logout() {
    this.token = '';
    localStorage.removeItem('token');
  }
  error() {
    return this.getError;
  }

  isLoading() {
    return this.load;
  }
}
