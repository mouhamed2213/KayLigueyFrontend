import {
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpRequest,
  HttpEvent,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';

export const apiResponseErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,

  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  console.log(req.url);

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        console.log(event);
      }
    }),
  );
};
