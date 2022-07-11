import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HELPER_CONFIG, HelperConfig} from '../helper.config';
import {LoggerFactory} from '../helper/logger';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private lumber = LoggerFactory.getLogger('httpClient');
  baseUrl?: string;
  baseUrlIgnorePaths?: string[];

  constructor(@Inject(HELPER_CONFIG) private config: HelperConfig) {
    this.baseUrl = config.baseUrl;
    this.baseUrlIgnorePaths = config.baseUrlIgnorePaths;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let toIntercept = true;
    if (this.baseUrlIgnorePaths) {
      for (const path of this.baseUrlIgnorePaths) {
        if (req.url.includes(path)) {
          toIntercept = false;
          break;
        }
      }
    }

    if (toIntercept && this.baseUrl && this.baseUrl.length > 0) {
      return next.handle(req.clone({url: `${this.baseUrl + req.url}`}));
    } else if (toIntercept) {
      this.lumber.warning('intercept', 'baseUrl undefined! It looks like you are using the BaseUrlInterceptor but forgot assigning it.');
    }
    return next.handle(req);
  }
}
