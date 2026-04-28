import { tap } from 'rxjs';
import {
  ApplicationStatus,
  APPLICATION_STATUS_CONFIG,
} from './../../../../core/constant/application-status';
import { inject, Component, OnInit, signal } from '@angular/core';
import { ApplicationService } from '../../../../core/services/application.service';
import { AuthService } from '../../../../core/services/auth.service';
import { IApplication } from '../../../../core/models';
import { LucideAngularModule } from 'lucide-angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WorkingModeLabelPipe } from '../../../../core/pipes/workingMode/working-mode.pipe';
import { ContractLabelPipe } from '../../../../core/pipes/contractLabel/contract-label.pipe';
import { DatePipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { LoggerService } from '../../../../core/services/logger/logger.service';

@Component({
  selector: 'app-application',
  imports: [
    LucideAngularModule,
    LoaderComponent,
    RouterLink,
    WorkingModeLabelPipe,
    ContractLabelPipe,
    DatePipe,
    MatProgressSpinner,
  ],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css',
})
export class ApplicationComponent implements OnInit {
  private authService = inject(AuthService);
  private applicationService = inject(ApplicationService);
  private router = inject(Router);
  private loggerService = inject(LoggerService);
  protected allAppliedJob: IApplication[] = [];
  protected currentPage = signal(1);
  protected limit = signal(3);
  protected totalApplications = signal(0);
  protected totalPages = signal(1);
  protected totalStats: any[] = [];
  protected submitted = signal<number>(0);
  protected globalStats!: Partial<Record<ApplicationStatus, number>>;
  protected isLoading = signal<boolean>(true);
  protected appConfig = APPLICATION_STATUS_CONFIG;
  protected userId = signal<string>('');

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/register');
      return;
    }

    this.authService.getUser().subscribe({
      next: (user) => {
        this.userId.set(user?.id as string);
        // console.log(user);
      },
    });

    this.fetchApplication();
  }

  /* =========================================================
   * CORE FETCH LOGIC
   * ========================================================= */
  private fetchApplication() {
    this.isLoading.set(true);

    this.loadApplications();
    this.loadApplicationDetails();
    this.loadStats();
    this.isLoading.set(false);
  }

  // LOAD APPLICATION DATA
  loadApplications() {
    this.applicationService
      .allAppliedsByUser(this.userId(), this.currentPage(), this.limit())
      .subscribe({
        next: (res) => {
          this.allAppliedJob = res.data;

          this.currentPage.set(res.meta.page);
          this.limit.set(res.meta.limit);
          this.totalApplications.set(res.meta.total);
          this.totalPages.set(res.meta.totalPages);
          // console.log(this.allAppliedJob);

          this.isLoading.set(false);
        },
        error: (err) => {
          this.loggerService.error(err);
          this.isLoading.set(false);
        },
      });
  }

  // LOAD STATS
  loadStats() {
    this.isLoading.set(true);
    this.applicationService.appliedStatsCount(this.userId()).subscribe({
      next: (res) => {
        // console.log(res.data);
        this.totalStats.push(res.data);
        this.formatGlobalappliedStats(this.totalStats);
      },
    });
  }

  // FORMAT STATS DEFAULT RESPONS
  formatGlobalappliedStats(stats: any[]) {
    // console.log(stats);
    const globalStats = stats[0].reduce((acc: any, item: any) => {
      acc[item.status] = item._count.status;
      return acc;
    }, {});

    this.globalStats = globalStats;

    // console.log(this.globalStats);
  }

  // PAGINATION
  loadApplicationDetails() {
    this.applicationService
      .allAppliedsByUser(this.userId(), this.currentPage(), this.limit())
      .subscribe({
        next: (res) => {
          // console.log(res);
        },
      });
  }

  pageNumbers() {
    let Tpage = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      Tpage.push(i);
    }
    return Tpage;
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadApplications();
    this.loadApplicationDetails();

    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
}
