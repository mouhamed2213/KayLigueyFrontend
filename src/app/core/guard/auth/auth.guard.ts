import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  Router,
  RedirectCommand,
} from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, // information about the the route that should be activated
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authenticated = authService.isAuthenticated();
  // console.log(authenticated);
  if (!authenticated) {
    const precedentUrl = router.createUrlTree([
      '/auth/login',
      {
        queryParam: { returnUrl: state.url },
      },
    ]);

    return new RedirectCommand(precedentUrl);
  }

  return true;
};
