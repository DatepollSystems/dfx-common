import {HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {catchError, finalize, Observable, tap, throwError} from 'rxjs';

import {LoggerFactory} from '../helper/logger';
import {AbstractIgnoreableInterceptor} from './abstract-ignoreable.interceptor';
import {HELPER_CONFIG, HelperConfig} from '../helper.config';

export const LOGGING_INTERCEPTOR = new HttpContextToken(() => false);

@Injectable()
export class LoggingInterceptor extends AbstractIgnoreableInterceptor {
  private lumber = LoggerFactory.getLogger('HttpClient');

  constructor(@Inject(HELPER_CONFIG) private config: HelperConfig) {
    super(LOGGING_INTERCEPTOR, config.loggingInterceptorIgnorePaths);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.shouldIntercept(req)) {
      return next.handle(req);
    }

    let text = 'URL: "' + req.url + '"';
    if (req.params.keys().length > 0) {
      text += ' | params: "' + req.params.toString() + '"';
    }

    const startTime = Date.now();
    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            const elapsedTime = Date.now() - startTime;
            text = 'Status: Success | ' + text + ' | Elapsed time: ' + elapsedTime + 'ms';
            this.lumber.log(req.method, text);
            this.lumber.log(req.method, 'Request body', req.body);
            this.lumber.log(req.method, 'Request response', event);
          }
        },
      }),
      catchError((error: any) => {
        if (error instanceof ErrorEvent) {
          text += ` | Error: ${error.message}`;
        } else if (error instanceof HttpErrorResponse) {
          text += ` | Error Status: ${error.status} | ${error.message}`;
        }
        const elapsedTime = Date.now() - startTime;
        text = 'Status: Error   | ' + text + ' | Elapsed time: ' + elapsedTime + 'ms';
        this.lumber.error(req.method, text, error);

        return throwError(() => text);
      })
    );
  }
}
