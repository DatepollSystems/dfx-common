import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {LoggerFactory} from '../helper/logger';
import {AnyOrUndefined, Params, UndefinedOr} from '../types';

export abstract class AHttpService {
  protected abstract apiUrl: UndefinedOr<string>;
  protected version = '';
  protected readonly headers = new HttpHeaders().set('Content-Type', 'application/json');
  protected lumber = LoggerFactory.getLogger('AHttpService');

  protected constructor(protected http: HttpClient) {}

  public get<T>(url: string, params?: Params, caller?: string): Observable<unknown | T> {
    return this.http.get<T>(this.apiUrl + this.version + url, {params: params}).pipe(
      tap((data) => {
        this.log('get', url, params, caller, data);
      }),
      catchError((error: any) => {
        this.log('get', url, params, caller, undefined, true);
        return this.error(error);
      })
    );
  }

  public post<T>(url: string, body: any, params?: Params, caller?: string): Observable<unknown | T> {
    return this.http.post<T>(this.apiUrl + this.version + url, body, {headers: this.headers, params: params}).pipe(
      tap((data) => {
        this.log('post', url, params, caller, data);
      }),
      catchError((error: HttpErrorResponse) => {
        this.log('post', url, params, caller, undefined, true);
        return this.error(error);
      })
    );
  }

  public put<T>(url: string, body: any, params?: Params, caller?: string): Observable<unknown | T> {
    return this.http.put<T>(this.apiUrl + this.version + url, body, {headers: this.headers, params: params}).pipe(
      tap((data) => {
        this.log('put', url, params, caller, data);
      }),
      catchError((error: HttpErrorResponse) => {
        this.log('put', url, params, caller, undefined, true);
        return this.error(error);
      })
    );
  }

  public delete(url: string, params?: Params, caller?: string): Observable<unknown> {
    return this.http.delete(this.apiUrl + this.version + url, {params: params}).pipe(
      tap((data) => {
        this.log('delete', url, params, caller, data);
      }),
      catchError((error: HttpErrorResponse) => {
        this.log('delete', url, params, caller, undefined, true);
        return this.error(error);
      })
    );
  }

  protected _clientSideError(): void {
    // No implementation needed
    this.lumber.info('_clientSideError', 'Not implemented, but no implementation needed!');
  }

  protected _serverSideError(): void {
    // No implementation needed
    this.lumber.info('_clientSideError', 'Not implemented, but no implementation needed!');
  }

  protected error(error: any): any {
    if (error.error instanceof ErrorEvent) {
      // Client Side Error
      this._clientSideError();
      return throwError(error.error.message);
    } else if (error.status > 499) {
      // Server Side Error
      this._serverSideError();
      return throwError(error.error.message);
    }
  }

  protected log(
    type: string,
    url: string,
    params: UndefinedOr<Params>,
    caller: UndefinedOr<string>,
    data: AnyOrUndefined,
    error: boolean = false
  ): void {
    let myString = 'URL: "' + url + '"';
    if (params) {
      myString += ' | params: "' + params.toString() + '"';
    }
    if (caller) {
      myString += ' | caller: "' + caller + '"';
    }
    if (error) {
      this.lumber.error(type, myString);
    } else {
      this.lumber.log(type, myString, data);
    }
  }
}
