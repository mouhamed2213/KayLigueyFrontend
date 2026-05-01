import { LoggerService } from './logger/logger.service';
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  IApplication,
  ICreateApplication,
  IPaginatedResponse,
} from '../../core/models';
import { ApiResponse } from '../../core/api/api.interface';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private apiUrl = `${environment.apiUrl}`;
  private http = inject(HttpClient);

  private logger = inject(LoggerService);

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

  currentJobOffer(
    appliedJobbOfferId: string,
    userId: string,
  ): Observable<ApiResponse<IApplication>> {
    console.log({ appliedJobbOfferId, userId });
    return this.http
      .get<
        ApiResponse<IApplication>
      >(`${this.apiUrl}/apply/${appliedJobbOfferId}/${userId}`)
      .pipe(
        tap((res) => {
          console.log(res.data);
        }),
      );
  }

  // Get all job applied by the user(CANDIDAT)
  allAppliedsByUser(
    userId: string,
    page: number = 1,
    limit: number = 3,
  ): Observable<IPaginatedResponse<IApplication>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http
      .get<
        IPaginatedResponse<IApplication>
      >(`${this.apiUrl}/apply/all/${userId}`, { params })
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => 'Error Occurse while loading Applications');
        }),
      );
  }

  appliedStatsCount(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/apply/stats/${userId}`).pipe(
      tap((res) => {
        console.log(res);
      }),

      catchError((err) => {
        this.logger.error('Error fetching stats');
        return throwError(() => err);
      }),
    );
  }
}
