import { Injectable } from '@angular/core';
import { root } from 'postcss';

@Injectable({ providedIn: 'root' })
export class AuthService {
  error() {
    return false;
  }

  isLoading() {
    return false;
  }
}
