import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { JobOfferService } from '../../services/job_offer.service';
import { JobOffer } from '../../../../core/models/job_offer.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { LucideAngularModule } from 'lucide-angular';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { IPagination } from '../../../../core/models/offer_respose.model';
import { IFilters } from '../../../../core/models/filter.model';
import { FormatSalaryPipe } from '../../../../shared/pipes/format-salary.pipe';
import {
  CONTRACT_TYPE_CONFIG,
  CONTRACT_TYPES,
} from '../../../../core/constant/contractTypes';

import { RouterLink } from '@angular/router';

import {
  WORKING_MODE_CONFIG,
  WORKING_MODES,
} from '../../../../core/constant/workingMode';

import { SN_REGIONS } from '../../../../core/constant/regions';

@Component({
  selector: 'app-offres',
  standalone: true,
  imports: [
    LoaderComponent,
    MatProgressSpinner,
    LucideAngularModule,
    ButtonComponent,
    BadgeComponent,
    MatPaginatorModule,
    DatePipe,
    FormatSalaryPipe,
    SlicePipe,
    UpperCasePipe,
    RouterLink,
  ],
  templateUrl: './offres.component.html',
  styleUrl: './offres.component.css',
})
export class OffresComponent implements OnInit {
  /* =========================================================
   * UI CONFIG (mapping + arrays for iteration)
   * ========================================================= */

  protected workingModeMap = WORKING_MODE_CONFIG;
  protected workingModes = WORKING_MODES;

  protected contractTypeMap = CONTRACT_TYPE_CONFIG;
  protected contractTypes = CONTRACT_TYPES;

  protected regions = SN_REGIONS;

  /* =========================================================
   * SERVICES
   * ========================================================= */

  private jobOfferService = inject(JobOfferService);
  private destroyRef = inject(DestroyRef);

  /* =========================================================
   * STATE MANAGEMENT (Signals)
   * ========================================================= */

  // Job data
  protected jobOffers = signal<JobOffer[]>([]);

  // Loading state (for UX)
  protected isLoading = signal(true);

  // Pagination state
  protected currentPage = signal<number>(1);
  protected jobPerPage = signal<number>(10);
  protected totalJobs = signal<number>(0);
  protected totalPages = signal<number>(0);

  // Select filte
  city = signal<string>('');

  // Backend pagination metadata
  protected pagination = signal<IPagination>({
    page: 1,
    limit: 10,
    total: 0,
  });

  // Filters state (single source of truth)
  protected filters = signal<IFilters>({
    city: this.city(),
    contract_type: '',
    working_mode: '',
    education_level: '',
    experience: '',
  });

  /* =========================================================
   * LIFECYCLE
   * ========================================================= */

  ngOnInit(): void {
    // Initial data fetch
    this.fetch();
  }

  /* =========================================================
   * CORE FETCH LOGIC
   * ========================================================= */

  fetch() {
    // Always enable loading before API call
    this.isLoading.set(true);

    this.loadJobOffer(this.currentPage(), this.jobPerPage(), this.filters());
  }

  loadJobOffer(page: number, limit: number, filters: IFilters) {
    this.jobOfferService
      .jobOffer(page, limit, filters)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ data, meta }) => {
          // Update job list
          this.jobOffers.set(data);

          // Sync pagination from backend
          this.pagination.set(meta);

          // Update derived state
          this.currentPage.set(meta.page);
          this.jobPerPage.set(meta.limit);
          this.totalJobs.set(meta.total);
          this.totalPages.set(Math.ceil(meta.total / meta.limit));

          // Stop loading
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.isLoading.set(false);
        },
      });
  }

  onSelectChange(value: string) {
    //  this.city.set(value);
    console.log(value);
  }

  /* =========================================================
   * FILTER MANAGEMENT
   * ========================================================= */

  // Generic filter updater (scalable)
  updateFilter<K extends keyof IFilters>(key: K, value: IFilters[K]) {
    this.filters.update((current) => ({
      ...current,
      // Toggle behavior (click again = remove filter)
      [key]: current[key] === value ? '' : value,
    }));

    // Reset to first page when filters change
    this.currentPage.set(1);

    // Refetch data
    this.fetch();
  }

  // Reset all filters
  resetFilters() {
    this.filters.set({
      city: '',
      contract_type: '',
      working_mode: '',
      education_level: '',
      experience: '',
    });

    this.currentPage.set(1);
    this.fetch();
  }

  /* =========================================================
   * PAGINATION
   * ========================================================= */

  onPageChange(page: number) {
    this.currentPage.set(page);

    // Fetch with current filters
    this.fetch();

    // UX: scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* =========================================================
   * HELPERS (optional)
   * ========================================================= */

  // Example: format salary
  formatSalary(min?: number, max?: number): string {
    if (!min && !max) return 'Non spécifié';
    return `${min ?? 0} - ${max ?? 0} FCFA`;
  }

  // Example: format date
  formatDate(date?: string): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }
  formatedDate = signal<any>('');

  pageNumbers() {
    return [];
  }
}
