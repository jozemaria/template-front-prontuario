import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/sign-in/service/auth.service';
import { SweetalertService } from '../shared/services/sweetalert.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService)
  const sweetAlertService = inject(SweetalertService)

  if (state.url === '/pages/resenha') return true
  if (authService.isLoggedIn !== true) {
    console.log(`dentro do if`)
    sweetAlertService.alert('error', 'Opss!', 'Faça login para continuar')
    router.navigate(['/auth/sign-in'])
    return false
  }
  return true;
};
