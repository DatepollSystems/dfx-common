import {Inject, Injectable} from '@angular/core';
import {HttpContextToken, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HELPER_CONFIG, HelperConfig} from '../helper.config';
import {AbstractIgnoreableInterceptor} from './abstract-ignoreable.interceptor';

export const POST_PUT_JSON_CONTENT_TYPE_INJECTOR = new HttpContextToken(() => false);

@Injectable()
export class PostPutJsonContentTypeInterceptor extends AbstractIgnoreableInterceptor {
  constructor(@Inject(HELPER_CONFIG) config: HelperConfig) {
    super(POST_PUT_JSON_CONTENT_TYPE_INJECTOR, config.postPutJsonContentTypeInterceptorIgnorePaths);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.shouldIntercept(req)) {
      return next.handle(req);
    }

    const method = req.method.toLowerCase();
    if (method.includes('post') || method.includes('put')) {
      return next.handle(req.clone({headers: req.headers.set('Content-Type', 'application/json')}));
    }
    return next.handle(req);
  }
}
