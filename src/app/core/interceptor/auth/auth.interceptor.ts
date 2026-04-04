import {
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  // add bear token to the header
  const token = localStorage.getItem('token');
  const authorization = { Authorization: `Bearer ${token}` };
  if (token) {
    // console.log(authorization);
    const cloned = req.clone({ setHeaders: authorization });
    // console.log('INTERCEPT TOKEN', token);
    return next(cloned);
  }

  return next(req);
};
