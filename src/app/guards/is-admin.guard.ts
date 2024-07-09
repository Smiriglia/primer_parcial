import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isAdminGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService)
  
  const isLoggedIn = await authService.isLoggedIn(); 

  if (isLoggedIn)
  {
    const user = authService.currentUserSignal()!;
    if(user.role == 'admin')
    {
      return true;
    }
    router.navigateByUrl('/not-found');
    return false;
  }

  router.navigateByUrl('/login');
  return false;
};
