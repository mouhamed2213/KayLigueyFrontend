import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { routes } from './app.routes';
import { errorInterceptor } from './core/interceptor/errors/error-interceptor';
import { authInterceptor } from './core/interceptor/auth/auth.interceptor';
import { apiResponseInterceptor } from './core/interceptor/api-response.interceptor';
import { withComponentInputBinding } from '@angular/router';
import icons from './shared/icons/icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        errorInterceptor,
        authInterceptor,
        apiResponseInterceptor,
      ]),
    ),
    importProvidersFrom(LucideAngularModule.pick(icons())),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
