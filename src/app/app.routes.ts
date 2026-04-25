import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guard/auth/auth.guard';
import { candidatGuard } from './core/guard/roles/user.guard';
import { ErrorPageComponent } from './shared/pages/error-page/error-page.component';
import { PUBLIC_ROUTE } from './features/public/public.route';
import { OffresComponent } from './features/offers/pages/offres/offres.component';
import { OFFERS_ROUTES } from './features/offers/offers.routes';

export const routes: Routes = [
  // 1. PUBLIC LAYOUT
  {
    path: '',
    loadComponent: () =>
      import('./layouts/public-layout/public-layout.component').then(
        (pl) => pl.PublicLayoutComponent,
      ),
    children: [
      ...PUBLIC_ROUTE,
      {
        path: 'offers',
        loadChildren: () =>
          import('./features/offers/offers.routes').then(
            (o) => o.OFFERS_ROUTES,
          ),
      },
      // Déplace la redirection ICI
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },

  // 2. AUTH PAGES (Pas de changement, mais pense au Lazy Loading si elles deviennent lourdes)
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  // 3. CANDIDAT AREA
  {
    path: 'candidat',
    canActivate: [authGuard, candidatGuard],
    loadComponent: () =>
      import('./layouts/candidate-layout/candidate-layout.component').then(
        (cl) => cl.CandidateLayoutComponent,
      ),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/candidat/candidat.routes').then(
            (ca) => ca.CANDIDAT_ROUTES,
          ),
      },

      // 3.1 OFFER PAGES
      { path: 'offers', component: OffresComponent },

      // 3.2 OFFER DETAIL PAGES
      {
        path: 'offers',
        loadComponent: () =>
          import('./features/offers/pages/offre-detail/offre-detail.component').then(
            (od) => od.OffreDetailComponent,
          ),
      },
    ],
  },

  // 4. ERROR PAGES
  {
    path: 'unauthorized',
    component: ErrorPageComponent,
    data: { code: '403', message: '...' },
  },
  {
    path: 'server-error',
    component: ErrorPageComponent,
    data: { code: '500', message: '...' },
  },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { code: '404', message: '...' },
  },

  // 5. CATCH ALL
  { path: '**', redirectTo: 'not-found' },
];
