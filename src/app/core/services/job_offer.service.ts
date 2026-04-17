import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ApiResponse } from '../api/api.interface';
import { JobOffer } from '../models/job_offer.model';

@Injectable({
  providedIn: 'root',
})

// Shared offer service for public and Candia
export class JobOfferService {
  private apiUrl = `${environment.apiUrl}/offers`;
  private http = inject(HttpClient);

  // Get all offer (future using pagination)
  public jobOffer(): Observable<ApiResponse<JobOffer[]>> {
    // create offer interface
    return this.http.get<ApiResponse<JobOffer[]>>(`${this.apiUrl}`).pipe(
      tap((data) => console.log(data)),
      catchError((err) => {
        console.error('Error fetching jobs:', err);
        return throwError(() => err);
      }),
    );
  }

  // get one job funtion
  // create a loading  while offre compnent get data
}
