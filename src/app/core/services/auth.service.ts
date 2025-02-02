import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { LoginRequest } from '../../layouts/auth-layout/login/model/LoginRequest';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  //private apiUrl = 'http://localhost:8080/sso-api/auth'; // Endpoint de autenticação
  private ssoApiUrl = `${environment.apiGatewayUrl}/sso-api`; // Endpoint de autenticação

  private cookieName = 'AUTH-TOKEN';

  private domain = environment.cookieDomain;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  // Função para realizar login e obter o token JWT
  preAuthenticate(loginRequest: LoginRequest): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.ssoApiUrl}/auth/pre-authenticate`, loginRequest, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), observe: 'response'
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Função para armazenar o token JWT no localStorage
  storeToken(token: string): void {
     // Defina o nome do cookie
   
    const expirationDays = 1; // Tempo de expiração do cookie, em dias

    const date = new Date();
    date.setDate(date.getDate() + expirationDays);

    this.cookieService.set(this.cookieName, token, date, '/', this.domain, true, 'None');
  }

  // Recupera o token do cookie
  getToken(): string | null {
    return this.cookieService.get(this.cookieName);
  }

  // Remove o token do cookie
  clearToken(): void {
    this.cookieService.delete(this.cookieName, '/', this.domain);
  }

  // Função para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Função de erro
  private handleError(error: any): Observable<never> {
    console.error(error);
    throw new Error('Erro de autenticação');
  }
}
