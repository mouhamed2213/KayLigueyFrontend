import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;

  // regis

  error() {
    console.log(this.apiUrl);
    return false;
  }

  isLoading() {
    return false;
  }
}
