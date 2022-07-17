import {HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';

import {LoggerFactory} from '../helper/logger';
import {AbstractIgnoreableInterceptor} from './abstract-ignoreable.interceptor';
import {HELPER_CONFIG, HelperConfig} from '../helper.config';

export const BY_PASS_LOGGING_INTERCEPTOR = new HttpContextToken(() => false);

@Injectable()
export class LoggingInterceptor extends AbstractIgnoreableInterceptor {
  private lumber = LoggerFactory.getLogger('HttpClient');

  constructor(@Inject(HELPER_CONFIG) private config: HelperConfig) {
    super(config.loggingInterceptorIgnorePaths, BY_PASS_LOGGING_INTERCEPTOR);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.shouldIntercept(req)) {
      return next.handle(req);
    }

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
