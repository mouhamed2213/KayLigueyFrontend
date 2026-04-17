import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

// Shared offer service for public and Candia
export class JobOfferService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private http = inject(HttpClient);
}
