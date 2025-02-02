import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from './base-resource.service';
import { Application } from '../model/usuario.model';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService extends BaseResourceService<Application> {

  constructor(protected override injector: Injector) {
    super('ativos', injector);
  }

  override getAll(): Observable<Application[]> {
    const url = `${environment.apiGatewayUrl}/sso-api/auth/applications`;
    return this.http.get<Application[]>(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResources)
    );
  }
}
