import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { OffresComponent } from '../offers/pages/offres/offres.component';
import { AboutComponent } from './pages/about/about.component';

export const PUBLIC_ROUTE: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'service', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
];
