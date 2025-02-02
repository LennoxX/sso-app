import { HttpRequest, HttpHandlerFn, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const cookieService = inject(CookieService); // Injeta o serviço de cookies
    const tokenCookieName = 'AUTH-TOKEN'; // Nome do cookie onde o token está armazenado
    const token = cookieService.get(tokenCookieName); // Recupera o token do cookie
  
    if (token) {
      // Clona a requisição e adiciona o header Authorization
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  
    return next(req); // Passa a requisição para o próximo handler
  };