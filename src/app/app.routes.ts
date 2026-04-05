import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guard/auth/auth.guard';
import { candidatGuard } from './core/guard/roles/user.guard';
import { ErrorPageComponent } from './shared/pages/error-page/error-page.component';

export const routes: Routes = [
  // landing page
  { path: '', component: LoginComponent, pathMatch: 'full' },
  // register
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/login', component: LoginComponent },

  // Candidat
  {
    path: 'candidat',
    loadComponent: () =>
      import('./features/candidat/pages/home/home.component').then(
        (h) => h.HomeComponent,
      ),

    loadChildren: () =>
      import('./features/candidat/candidat.routes').then(
        (c) => c.CANDIDAT_ROUTES,
      ),
    canActivate: [authGuard, candidatGuard],
  },

  // ERROR PAGE

  {
    path: '404',
    component: ErrorPageComponent,
    data: { code: 404, message: 'Not Found' },
  },
  {
    path: '403',
    component: ErrorPageComponent,
    data: { code: 403, message: 'Fobidden' },
  },
];
