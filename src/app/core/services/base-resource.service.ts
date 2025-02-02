import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injector } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { BaseResourceModel } from '../model/base-resource.model';
import { environment } from '../../../environments/environment';
import { ApiError } from '../model/apierror.model';
import { CustomHttpErrorResponse } from '../model/customhttperrorresponse.model';

export class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;

  constructor(protected apiPath: string, protected injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    const url = `${environment.apiGatewayUrl}${this.apiPath}`;
    return this.http.get<T[]>(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResources)
    );
  }


  getById(id: number): Observable<T> {
    const url = `${environment.apiGatewayUrl}${this.apiPath}/${id}`;
    return this.http.get<T>(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)
    );
  }

  create(resource: T): Observable<T> {
    const url = `${environment.apiGatewayUrl}${this.apiPath}`;
    return this.http.post<T>(url, resource).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)
    );
  }

  update(resource: T): Observable<T> {
    const url = `${environment.apiGatewayUrl}${this.apiPath}${this.apiPath}`;
    return this.http.put<T>(url, resource).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${environment.apiGatewayUrl}${this.apiPath}${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  // Metodos Protegidos
  protected jsonDataToResources(jsonData: T[]): T[] {
    const resources: T[] = [];
    jsonData.forEach((element: any) => {
      const resource = Object.assign(new Response(), element);
      resources.push(resource);
    });
    return resources;
  }

  protected jsonDataToResource(jsonData: T): T {
    const resource = Object.assign(new Response(), jsonData);
    return resource;
  }

  protected handleError(response: HttpErrorResponse) {

    return throwError(() => new ApiError(response.status, response.message, response.error));
  }

}
