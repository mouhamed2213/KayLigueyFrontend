import { Routes } from '@angular/router';
import { Register } from './features/auth/register/register';

export const routes: Routes = [
  // landing page

  // register
  { path: 'auth/register', component: Register },
];
