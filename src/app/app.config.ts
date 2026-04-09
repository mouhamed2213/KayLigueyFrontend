import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  LucideAngularModule,
  User,
  Phone,
  Building,
  Menu,
  X,
  MapPin,
  Search,
  MoveRight,
} from 'lucide-angular';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { routes } from './app.routes';
import { errorInterceptor } from './core/interceptor/errors/error-interceptor';
import { authInterceptor } from './core/interceptor/auth/auth.interceptor';

import { withComponentInputBinding } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withFetch(),
      withInterceptors([errorInterceptor, authInterceptor]),
    ),
    importProvidersFrom(
      LucideAngularModule.pick({ MoveRight, Phone, Search, Building, Menu, X }),
    ),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
