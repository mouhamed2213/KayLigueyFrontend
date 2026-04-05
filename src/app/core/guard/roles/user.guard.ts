import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';

export const candidatGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.hasRole();

  if (role !== 'CANDIDAT') {
    // Redirige vers login ou une page "Accès refusé"
    return new RedirectCommand(router.createUrlTree(['/login'])); // delete login
  }

  return true;
};
