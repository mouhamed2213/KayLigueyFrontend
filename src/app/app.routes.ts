import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
  // landing page

  // register
  { path: 'auth/register', component: RegisterComponent },
];
