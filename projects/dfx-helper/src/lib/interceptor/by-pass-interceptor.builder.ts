import {HttpContext, HttpContextToken} from '@angular/common/http';
import {BASE_URL_INTERCEPTOR} from './base-url.interceptor';
import {LOGGING_INTERCEPTOR} from './logging.interceptor';
import {POST_PUT_JSON_CONTENT_TYPE_INTERCEPTOR} from './post-put-json-content-type.interceptor';

export const interceptorByPass = (context?: HttpContext): ByPassInterceptorBuilder => {
  return new ByPassInterceptorBuilder(context);
};

export class ByPassInterceptorBuilder {
  private tokens: HttpContextToken<boolean>[] = [];
  private context?: HttpContext;

  constructor(context?: HttpContext) {
    this.context = context;
  }

  public baseUrl(): ByPassInterceptorBuilder {
    this.tokens.push(BASE_URL_INTERCEPTOR);
    return this;
  }

  public logging(): ByPassInterceptorBuilder {
    this.tokens.push(LOGGING_INTERCEPTOR);
    return this;
  }

  public postPutJsonContentType(): ByPassInterceptorBuilder {
    this.tokens.push(POST_PUT_JSON_CONTENT_TYPE_INTERCEPTOR);
    return this;
  }

  public enable(context?: HttpContext): HttpContext {
    this.context = context ?? this.context ?? new HttpContext();
    for (const token of this.tokens) {
      this.context.set(token, true);
    }
    return this.context;
  }
}
