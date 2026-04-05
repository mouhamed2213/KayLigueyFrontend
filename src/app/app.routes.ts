import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guard/auth/auth.guard';
import { candidatGuard } from './core/guard/roles/user.guard';
import { ErrorPageComponent } from './shared/pages/error-page/error-page.component';
import { HomeComponent } from './features/public/pages/home/home.component';

export const routes: Routes = [
  // Public page
  {
    path: '',
    loadComponent: () =>
      import('./features/public/pages/home/home.component').then(
        (pb) => pb.HomeComponent,
      ),
    loadChildren: () =>
      import('./features/public/public.route').then((r) => r.PUBLIC_ROUTE),

    pathMatch: 'full',
  },

  // Authentication
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
    path: 'unauthorized',
    component: ErrorPageComponent,
    data: {
      code: '403',
      message: "Accès refusé : vous n'avez pas les droits nécessaires.",
    },
  },
  {
    path: 'server-error',
    component: ErrorPageComponent,
    data: {
      code: '500',
      message: 'Le serveur rencontre un problème. Réessayez plus tard.',
    },
  },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { code: '404', message: "Oups ! Cette page n'existe pas." },
  },

  // Wildcard pour attraper toutes les URLs inconnues
  { path: '**', redirectTo: 'not-found' },
];
