import { OffreDetailComponent } from './pages/offre-detail/offre-detail.component';
import { OffresComponent } from './pages/offres/offres.component';

export const OFFERS_ROUTES = [
  {
    path: '',
    component: OffresComponent,
  },

  {
    path: 'offers',
    component: OffresComponent,
  },

  {
    path: 'offer/:id',
    component: OffreDetailComponent,
  },
];
