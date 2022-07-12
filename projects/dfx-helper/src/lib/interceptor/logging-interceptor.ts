import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';

import {LoggerFactory} from '../helper/logger';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  private lumber = LoggerFactory.getLogger('HttpClient');

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let text = 'URL: "' + req.url + '"';
    if (req.params) {
      text += ' | params: "' + req.params.toString() + '"';
    }
    this.lumber.log(req.method, text, req.body);

    return next.handle(req).pipe(
      catchError((error: any) => {
        if (error instanceof ErrorEvent) {
          text += ` | Error: ${error.message}`;
        } else if (error instanceof HttpErrorResponse) {
          text += ` | Error Status: ${error.status} | ${error.message}`;
        }
        this.lumber.error(req.method, text);
        console.log(error);

        return throwError(() => text);
      })
    );
  }
}
