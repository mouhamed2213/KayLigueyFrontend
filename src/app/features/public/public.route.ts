import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { OffresComponent } from './pages/offres/offres.component';

export const PUBLIC_ROUTE: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'offres', component: OffresComponent },
  { path: 'service', component: HomeComponent },
  { path: 'blog', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
];
