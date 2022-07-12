import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class PostPutJsonContentTypeInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const method = req.method.toLowerCase();
    if (method.includes('post') || method.includes('put')) {
      return next.handle(req.clone({headers: req.headers.set('Content-Type', 'application/json')}));
    }
    return next.handle(req);
  }
}
