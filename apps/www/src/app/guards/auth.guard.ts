import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { SessionService } from '../services/session.service';

export const authGuard: CanActivateFn = (route, state) => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if (sessionService.isLoggedIn()) {
    return true;
  }

  // Redirect to login page with return url
  return router.createUrlTree(['/'], {
    queryParams: { returnUrl: state.url },
  });
};
