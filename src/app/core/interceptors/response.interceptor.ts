import { HttpRequest, HttpHandlerFn, HttpInterceptorFn, HttpResponse, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { ApiError } from "../model/apierror.model";
import { ToastService } from "../services/toast.service";

export const responseInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>, 
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        const token = event.headers.get('Authorization'); // Altere o nome do cabeçalho, se necessário
        if (token) {
          authService.storeToken(token);
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      // Captura erros do tipo HttpErrorResponse
      if (error.status === 401) {
        authService.clearToken();
        router.navigate(['/auth/login']).then(() => {
          toast.showCommonErrorMessage('Usuário não autenticado');
        });
      }

      // Retorna o erro para quem chamou
      return throwError(() => new Error(error.message || 'Erro desconhecido'));
    })
  );
};