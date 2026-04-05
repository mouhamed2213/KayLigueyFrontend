import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from '../../core/guard/auth/auth.guard';
export const CANDIDAT_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },

  {
    path: 'homeCandidat',
    component: HomeComponent,
  },
];
