import { Injectable, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  protected authService = inject(AuthService);
}
