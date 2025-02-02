import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);

  const router = inject(Router);

  if (authService.getToken() != null && authService.getToken() != '') {
    // logica para validar o token 
    // if (token.isValid()) {}
    return true;
  } else {
    // logica para redirecionar para a tela de login
    router.navigate(['/auth/login']);
    return false;
  }
};
