import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  if (!accountService.isLoggedIn()) {
    return true;
  }

  // Redirect to home page if already logged in
  return router.createUrlTree(['/home']);
};
