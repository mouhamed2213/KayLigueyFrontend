import { Component } from '@angular/core';
import { CandidateNavComponent } from '../../shared/components/candidate-nav/candidate-nav.component';
import { RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';
import { DatePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-candidate-layout',
  imports: [
    CandidateNavComponent,
    RouterOutlet,

    MatIconModule,
    MatCardModule,
    MatMenuModule,
    // DatePipe,
    RouterLink,
    MatProgressBar,
    MatChipsModule,
    MatBadgeModule,
    MatDividerModule,
  ],
  templateUrl: './candidate-layout.component.html',
  styleUrl: './candidate-layout.component.css',
})
export class CandidateLayoutComponent {
  notifPanel = {
    toggle: () => {},
  };
  recentNotifications() {
    return [];
  }

  markAllRead() {}
  suggestedOffers() {
    return [];
  }
  onOfferClick(id: string) {}
  profileChecklist() {
    return [];
  }

  profileCompletion() {
    return 50;
  }

  upcomingInterviews() {
    return [];
  }

  recentApplications() {
    return [];
  }

  onApplicationClick(id: string) {
    return [];
  }

  unreadCount() {
    return 2;
  }

  getStatusClass(classd: string) {}

  getStatusLabel(label: string) {}
  cvCount() {}
  userInitials() {}

  onLogout() {}
  pendingCount() {
    return 5;
  }

  onNotifClick(notif: string) {}
}
