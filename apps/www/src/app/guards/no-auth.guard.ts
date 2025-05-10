import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { SessionService } from '../services/session.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if (!sessionService.isLoggedIn()) {
    return true;
  }

  // Redirect to home page if already logged in
  return router.createUrlTree(['/home']);
};
