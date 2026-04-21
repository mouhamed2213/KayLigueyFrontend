import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    const { city, working_mode, contract_type, education_level } = filters;

    const queriesParam = new HttpParams()
      .set('page', page)
      .set('limit', limit)
      .set('city', city)
      .set('working_mode', working_mode)
      .set('contract_type', contract_type)
      .set('education_level', education_level);
    return this.http
      .get<IOfferResponse<JobOffer[]>>(`${this.apiUrl}`, {
        params: queriesParam,
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
