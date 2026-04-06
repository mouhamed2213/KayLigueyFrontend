import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const PUBLIC_ROUTE: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'offres', component: HomeComponent },
  { path: 'service', component: HomeComponent },
  { path: 'blog', component: HomeComponent },
];
