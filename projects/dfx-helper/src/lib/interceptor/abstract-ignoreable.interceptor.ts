import {HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export abstract class AbstractIgnoreableInterceptor implements HttpInterceptor {
  protected ignorePaths?: string[];

  protected constructor(ignorePaths?: string[], private BY_PASS?: HttpContextToken<boolean>) {}

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
