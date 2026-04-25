import { HttpInterceptorFn } from '@angular/common/http';

export const apiResponseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
