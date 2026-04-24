import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';
import { map, catchError, of } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

export const candidatGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // On demande l'utilisateur et on vérifie son rôle quand il arrive
  return authService.getUser().pipe(
    map((user) => {
      if (user?.role === 'CANDIDAT') {
        return true;
      } else {
        return router.createUrlTree(['/unauthorized']);
      }
    }),
    catchError(() => of(router.createUrlTree(['/login']))),
  );
};
