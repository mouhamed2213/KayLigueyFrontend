import { Routes } from '@angular/router';

import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';

import { authGuard } from './core/guard/auth/auth.guard';
import { candidatGuard } from './core/guard/roles/user.guard';
import { ErrorPageComponent } from './shared/pages/error-page/error-page.component';
import { PUBLIC_ROUTE } from './features/public/public.route';

export const routes: Routes = [
  // =====================================================
  // PUBLIC LAYOUT (visible pour tout le monde)
  // =====================================================
  {
    path: '',
    loadComponent: () =>
      import('./layouts/public-layout/public-layout.component').then(
        (m) => m.PublicLayoutComponent,
      ),

    children: [
      // Pages publiques simples
      ...PUBLIC_ROUTE,

      // Feature OFFERS (accessible à tous)
      // même composant pour visiteur + candidat
      {
        path: 'offers',
        loadChildren: () =>
          import('./features/offers/offers.routes').then(
            (m) => m.OFFERS_ROUTES,
          ),
      },
    ],
  },

  // =====================================================
  // AUTH PAGES (pas de layout public)
  // =====================================================
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  // =====================================================
  // CANDIDAT AREA (dashboard protégé)
  // =====================================================
  {
    path: 'candidat',
    loadChildren: () =>
      import('./features/candidat/candidat.routes').then(
        (m) => m.CANDIDAT_ROUTES,
      ),

    canActivate: [authGuard, candidatGuard],
  },

  // =====================================================
  //  ERROR PAGES (global handling)
  // =====================================================
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
      message: 'Le serveur rencontre un problème.',
    },
  },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: {
      code: '404',
      message: 'Page non trouvée.',
    },
  },

  // =====================================================
  // 🔁 REDIRECTIONS
  // =====================================================

  // Page d'accueil par défaut
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Catch all unknown routes
  { path: '**', redirectTo: 'not-found' },
];
