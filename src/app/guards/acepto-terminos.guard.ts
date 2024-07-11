import { CanDeactivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const aceptoTerminosGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  const authService = inject(AuthService);
  if (authService.currentUserSignal()?.aceptoTerminos)
    return true;

  return false;
};