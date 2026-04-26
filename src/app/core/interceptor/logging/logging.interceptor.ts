import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoggerService } from '../../services/logger/logger.service';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {

  const logger = inject(LoggerService);
  const start = Date.now();
  const correlationId = crypto.randomUUID();

  const cloned = req.clone({
    setHeaders: { 'X-Correlation-ID': correlationId }
  });

  logger.debug('HTTP Request', {
    method: cloned.method,
    url: cloned.url,
    correlationId
  });

  return next(cloned).pipe(
    tap({
      next: (event: any) => {
        if (event?.status) {
          logger.info('HTTP Response', {
            method: cloned.method,
            url: cloned.url,
            status: event.status,
            duration: Date.now() - start,
            correlationId
          });
        }
      },
      error: (error) => {
        logger.error('HTTP Error', {
          method: cloned.method,
          url: cloned.url,
          status: error.status,
          duration: Date.now() - start,
          correlationId
        });
      }
    })
  );
};
