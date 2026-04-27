import {
  HttpEventType,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { map } from 'rxjs';

export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map((event) => {
      if (event.type !== HttpEventType.Response) {
        return event;
      }

      const response = event as HttpResponse<any>;
      const body = response.body;

      if (!body?.data) return response;

      // this is for response without paginiation data.data
      if (!body.data.meta) {
        return response.clone({
          body: body.data.data,
        });
      }

      // meta is meta dat for pagination
      return response.clone({
        body: body.data,
      });
    }),
  );
};
