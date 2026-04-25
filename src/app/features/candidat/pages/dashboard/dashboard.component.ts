import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
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
  selector: 'app-dashboard',
  imports: [
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    DatePipe,
    RouterLink,
    MatProgressBar,
    MatChipsModule,
    MatBadgeModule,
    MatDividerModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private authService = inject(AuthService);
  userName() {}

  notifPanel = {
    toggle: () => {},
  };
  unreadCount() {
    return 0;
  }
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
