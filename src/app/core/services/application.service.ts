import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IApplication, ICreateApplication } from '../../core/models';
import { ApiResponse } from '../../core/api/api.interface';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private apiUrl = `${environment.apiUrl}`;
  private http = inject(HttpClient);

  applyToJobOffer(applicationInfo: ICreateApplication): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/apply`, applicationInfo).pipe(
      tap((response) => {
        console.log(response);

        catchError((err) => {
          console.error(err.err.message);
          return throwError(() => err);
        });
      }),
    );
  }

  getAppliedJobOffer(
    appliedJobbOfferId: string,
  ): Observable<ApiResponse<IApplication>> {
    return this.http.get<ApiResponse<IApplication>>(
      `${this.apiUrl}/apply/${appliedJobbOfferId}`,
    );
  }

  allAppliedsByUser(userId: string): Observable<ApiResponse<IApplication[]>> {
    return this.http
      .get<ApiResponse<IApplication[]>>(`${this.apiUrl}/apply/all/${userId}`)
      .pipe(
        tap((data) => {
          console.log(data.data);
        }),
      );
  }
}
