import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticatedASAdmin()) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
