import {
  ApplicationStatus,
  APPLICATION_STATUS_CONFIG,
} from './../../../../core/constant/application-status';
import { inject, Component, OnInit, signal } from '@angular/core';
import { ApplicationService } from '../../../../core/services/application.service';
import { AuthService } from '../../../../core/services/auth.service';
import { IApplication } from '../../../../core/models';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-application',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css',
})
export class ApplicationComponent implements OnInit {
  private authService = inject(AuthService);
  private applicationService = inject(ApplicationService);

  protected allAppliedJob: IApplication[] = [];

  protected page = signal(1);
  protected limit = signal(3);
  protected total = signal(0);
  protected totalPages = signal(1);
  protected totalStats: any[] = [];
  protected totalInReview = signal<number>(0);
  protected submitted = signal<number>(0);
  protected globalStats!: Partial<Record<ApplicationStatus, number>>;

  protected appConfig = APPLICATION_STATUS_CONFIG;
  ngOnInit(): void {
    this.loadApplications();
    this.loadStats();
  }

  loadApplications() {
    this.applicationService
      .allAppliedsByUser(
        'e91668c2-839a-43f5-8203-5a392a9643b4',
        this.page(),
        this.limit(),
      )
      .subscribe({
        next: (res) => {
          this.allAppliedJob = res.data;

          this.page.set(res.meta.page);
          this.limit.set(res.meta.limit);
          this.total.set(res.meta.total);
          this.totalPages.set(res.meta.totalPages);
          // console.log(this.allAppliedJob);
        },
      });
  }

  // get all all applied statut with status INREVIEW
  loadStats() {
    this.applicationService
      .appliedStatsCount('e91668c2-839a-43f5-8203-5a392a9643b4')
      .subscribe({
        next: (res) => {
          // console.log(res.data);
          this.totalStats.push(res.data);
          this.formatGlobalappliedStats(this.totalStats);
        },
      });
  }

  formatGlobalappliedStats(stats: any[]) {
    console.log(stats);

    const globalStats = stats[0].reduce((acc: any, item: any) => {
      acc[item.status] = item._count.status;
      return acc;
    }, {});

    this.globalStats = globalStats;

    console.log(this.globalStats);
  }
}
