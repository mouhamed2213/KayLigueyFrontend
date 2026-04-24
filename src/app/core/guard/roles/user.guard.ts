import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';
import { map, catchError, of } from 'rxjs';

export const candidatGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

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
