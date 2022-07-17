import {HttpContext, HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export const byPassInterceptor = (BY_PASS_TOKEN: HttpContextToken<boolean>, context?: HttpContext): HttpContext => {
  if (context) {
    return context.set(BY_PASS_TOKEN, true);
  }
  return new HttpContext().set(BY_PASS_TOKEN, true);
};

export abstract class AbstractIgnoreableInterceptor implements HttpInterceptor {
  protected constructor(protected BY_PASS?: HttpContextToken<boolean>, protected ignorePaths?: string[]) {}

  abstract intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;

  public shouldIntercept(req: HttpRequest<any>): boolean {
    if (this.BY_PASS && req.context.get(this.BY_PASS)) {
      return false;
    }
    if (!this.ignorePaths) {
      return true;
    }
    // Fastest method
    for (const path of this.ignorePaths) {
      if (req.url.includes(path)) {
        return false;
      }
    }
    return true;
  }
}
