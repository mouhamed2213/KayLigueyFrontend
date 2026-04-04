import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  // landing page

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
  },
];
