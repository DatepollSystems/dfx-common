import {HttpContextToken, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HELPER_CONFIG, HelperConfig} from '../helper.config';
import {LoggerFactory} from '../helper/logger';
import {AbstractIgnoreableInterceptor} from './abstract-ignoreable.interceptor';

export const BASE_URL_INTERCEPTOR = new HttpContextToken(() => false);

@Injectable()
export class BaseUrlInterceptor extends AbstractIgnoreableInterceptor {
  private lumber = LoggerFactory.getLogger('httpClient');
  baseUrl?: string;

  constructor(@Inject(HELPER_CONFIG) private config: HelperConfig) {
    super(BASE_URL_INTERCEPTOR, config.baseUrlInterceptorIgnorePaths);
    this.baseUrl = config.baseUrl;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.shouldIntercept(req)) {
      return next.handle(req);
    }

    if (this.baseUrl && this.baseUrl.length > 0) {
      return next.handle(req.clone({url: `${this.baseUrl + req.url}`}));
    }

    this.lumber.warning(
      'intercept',
      'baseUrl undefined! It looks like you are using the BaseUrlInterceptor but forgot assigning a base url.'
    );
    return next.handle(req);
  }
}
