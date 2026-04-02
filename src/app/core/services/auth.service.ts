import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private token!: string;

  getError!: string;
  load: boolean = false;
  // register
  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, data).pipe(
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
  login(data: any): Observable<any> {
    // console.log(data);
    return this.http.post<any>(`${this.apiUrl}/auth/login`, data).pipe(
      tap({
        error: (err) => {
          this.getError = err.error.message;
          console.log(this.getError);
        },
      }),
    );

    return data;
  }

  // redirect after login
  redirectAfterLogin() {}
  error() {
    return this.getError;
  }

  isLoading() {
    return this.load;
  }
}
