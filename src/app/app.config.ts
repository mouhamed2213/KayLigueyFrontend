import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  LOCALE_ID,
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
import { apiResponseErrorInterceptor } from './core/interceptor/api-interceptor/errors/api-response.interceptor';
import { loggingInterceptor } from './core/interceptor/logging/logging.interceptor';
import { withComponentInputBinding } from '@angular/router';
import { responseInterceptor } from './core/interceptor/api-interceptor/response/response.interceptor';
import icons from './shared/icons/icons';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeFr, 'en-FR');

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'en-FR' },
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        errorInterceptor,
        loggingInterceptor,
        authInterceptor,
        apiResponseErrorInterceptor,
        responseInterceptor,
      ]),
    ),

    importProvidersFrom(LucideAngularModule.pick(icons())),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
