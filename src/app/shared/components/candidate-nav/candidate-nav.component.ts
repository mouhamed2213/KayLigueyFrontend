import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-candidate-nav',
  imports: [MatIconModule, MatMenuModule, MatDividerModule, MatBadgeModule],
  templateUrl: './candidate-nav.component.html',
  styleUrl: './candidate-nav.component.css',
})
export class CandidateNavComponent {
  private authservice = inject(AuthService);

  onLogout() {
    return this.authservice.logout();
  }

  unreadCount() {
    return 0;
  }

  userInitials() {}

  userName() {}

  notifPanel = {
    toggle: () => {},
  };
}
