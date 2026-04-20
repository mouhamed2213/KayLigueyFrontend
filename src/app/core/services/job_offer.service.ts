import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { JobOffer } from '../models/job_offer.model';
import { IOfferResponse } from '../models/offer_respose.model';
import { IFilters } from '../models/filter.model';

@Injectable({
  providedIn: 'root',
})

// Shared offer service for public and Candia
export class JobOfferService {
  private apiUrl = `${environment.apiUrl}/offers`;
  private http = inject(HttpClient);

  // Get all offer (future using pagination)
  public jobOffer(
    page: number,
    limit: number,
    filters: IFilters,
  ): Observable<IOfferResponse<JobOffer[]>> {
    const { city, working_mode, contract_type } = filters;
    return this.http
      .get<IOfferResponse<JobOffer[]>>(`${this.apiUrl}`, {
        params: {
          page,
          limit,
          city,
          working_mode,
          contract_type,
        },
      })
      .pipe(
        // tap((result) => console.log(result)),
        map((res) => {
          return { data: res.data, meta: res.meta };
        }),

        catchError((err) => {
          console.error('Error fetching jobs:', err);
          return throwError(() => err);
        }),
      );
  }

  // get one job funtion
  // create a loading  while offre compnent get data
}
