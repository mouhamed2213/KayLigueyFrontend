import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  // console.log(req);
  let userMessage = 'Une erreur est survenue';

  return next(req).pipe(
    // handle errors
    catchError((err) => {
      // console.log(err);
      if (err.status === 0) {
        userMessage = 'Le serveur est momentanément indisponible';
      } else if (err.status >= 500) {
        userMessage = 'Erreur serveur';
      }

      const customError = { ...err, error: { message: userMessage } };

      return throwError(() => customError);
    }),
  );
};
