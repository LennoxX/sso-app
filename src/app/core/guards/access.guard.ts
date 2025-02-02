import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';


export const accessGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);

  const router = inject(Router);
 
  if (authService.getToken() != null && authService.getToken() != '') {
    // logica para validar o token 
    // if (token.isValid()) {},
    router.navigate(['/']);
    return false;
  } else {
    // logica para redirecionar para a tela de login
    return true;
  }


};
