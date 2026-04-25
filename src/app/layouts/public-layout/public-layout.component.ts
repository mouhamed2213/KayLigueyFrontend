import { Component, computed, inject, signal } from '@angular/core';
import { NavbarPublicComponent } from '../../shared/components/navbar-public/navbar-public.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CandidateNavComponent } from '../../shared/components/candidate-nav/candidate-nav.component';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-public-layout',

  imports: [
    NavbarPublicComponent,
    RouterOutlet,
    FooterComponent,
    CandidateNavComponent,
  ],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css',
})
export class PublicLayoutComponent {
  protected authservice = inject(AuthService);

  protected isAuthenticated = computed(() => {
    const state = signal<boolean>(this.authservice.isAuthenticated());
    // console.log(state());
    return state();
  });
}
