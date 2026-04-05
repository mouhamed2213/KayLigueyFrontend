import {
  CanActivateFn,
  Router,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';
import { map, filter, take } from 'rxjs/operators';
import { toObservable } from '@angular/core/rxjs-interop';

export const candidatGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. On transforme le Signal en Observable pour pouvoir "attendre"
  return toObservable(authService.userRole).pipe(
    // 2. On attend que la valeur ne soit plus 'undefined'
    // (cela veut dire que getMe() a répondu ou qu'il n'y a personne)
    filter((role) => role !== undefined),
    take(1), // On prend la première valeur valide
    map((role) => {
      if (role === 'CANDIDAT') {
        return true;
      }
      // Si pas le bon rôle, redirection
      return router.createUrlTree(['/unauthorized']);
    }),
  );
};
