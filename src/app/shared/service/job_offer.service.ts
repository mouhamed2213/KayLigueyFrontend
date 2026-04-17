import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// Shared offer service for public and Candia
export class JobOfferService {
  private apiUrl = `${environment.apiUrl}/offers`;
  private http = inject(HttpClient);

  // Get all offer (future using pagination)
  public jobOffer(): Observable<string> {
    // create offer interface
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      tap((data) => {
        console.log('RECEIVED OFFER ', data);
      }),
    );
  }
}
