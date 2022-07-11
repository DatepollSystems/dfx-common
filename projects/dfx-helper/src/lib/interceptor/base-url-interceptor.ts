import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HELPER_CONFIG, HelperConfig} from '../helper.config';
import {LoggerFactory} from '../helper/logger';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private lumber = LoggerFactory.getLogger('httpClient');
  baseUrl?: string;

  constructor(@Inject(HELPER_CONFIG) private config: HelperConfig) {
    this.baseUrl = config.baseUrl;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.baseUrl && this.baseUrl.length > 0) {
      return next.handle(req.clone({url: `${this.baseUrl}/${req.url}`}));
    } else {
      this.lumber.warning('intercept', 'It looks like you are intercepting requests to add a base url but you did not define one.');
    }
    return next.handle(req);
  }
}
