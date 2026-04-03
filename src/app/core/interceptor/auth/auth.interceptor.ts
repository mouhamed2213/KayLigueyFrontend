import {
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptot: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  // add bear token to the header

  const token = localStorage.getItem('token');
  console.log('INTERCEPT TOKEN', token);

  return next(req);
};
