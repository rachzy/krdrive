import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AccountService } from '../api/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  if (accountService.isLoggedIn()) {
    return true;
  }

  // Redirect to login page with return url
  return router.createUrlTree(['/'], {
    queryParams: { returnUrl: state.url },
  });
};
