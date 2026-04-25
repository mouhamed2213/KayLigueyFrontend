import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
@Component({
  selector: 'app-candidate-nav',
  imports: [RouterLink],
  templateUrl: './candidate-nav.component.html',
  styleUrl: './candidate-nav.component.css',
})
export class CandidateNavComponent {
  private authservice = inject(AuthService);

  logout() {
    return this.authservice.logout();
  }
}
