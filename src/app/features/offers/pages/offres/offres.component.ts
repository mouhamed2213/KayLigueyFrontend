import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { JobOfferService } from '../../services/job-offer.service';
import { JobOffer } from '../../../../core/models/job-offer.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { LucideAngularModule } from 'lucide-angular';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { IPagination } from '../../../../core/models/offer-respose.model';
import { IFilters } from '../../../../core/models/filter.model';
import { FormatSalaryPipe } from '../../../../shared/pipes/format-salary.pipe';
import { ContractLabelPipe } from '../../../../core/pipes/contractLabel/contract-label.pipe';
import { WorkingModeLabelPipe } from '../../../../core/pipes/workingMode/working-mode.pipe';
import { JobOfferWithDetail } from '../../../../core/models';

import {
  CONTRACT_TYPE_CONFIG,
  CONTRACT_TYPES,
} from '../../../../core/constant/contract-types';

import { RouterLink } from '@angular/router';

import {
  WORKING_MODE_CONFIG,
  WORKING_MODES,
} from '../../../../core/constant/working-mode';

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
    ContractLabelPipe,
    RouterLink,
    ContractLabelPipe,
    WorkingModeLabelPipe,
    WorkingModeLabelPipe,
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

  protected jobOffers = signal<JobOfferWithDetail[]>([]);
  protected isLoading = signal(true);

  protected currentPage = signal<number>(1);
  protected jobPerPage = signal<number>(10);
  protected totalJobs = signal<number>(0);
  protected totalPages = signal<number>(0);

  city = signal<string>('');

  protected pagination = signal<IPagination>({
    page: 1,
    limit: 10,
    total: 0,
  });

  protected filters = signal<IFilters>({
    city: this.city(),
    contract_type: '',
    working_mode: '',
    education_level: '',
    experience: '',
  });

  ngOnInit(): void {
    this.fetchJobOffer();
  }

  fetchJobOffer() {
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

          this.pagination.set(meta);

          this.currentPage.set(meta.page);
          this.jobPerPage.set(meta.limit);
          this.totalJobs.set(meta.total);
          this.totalPages.set(Math.ceil(meta.total / meta.limit));

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

  // Generic filter updater
  updateFilter<K extends keyof IFilters>(key: K, value: IFilters[K]) {
    this.filters.update((current) => ({
      ...current,
      // Toggle behavior (click again = remove filter)
      [key]: current[key] === value ? '' : value,
    }));

    // Reset to first page when filters change
    this.currentPage.set(1);

    // RefrechData data
    this.fetchJobOffer();
  }

  resetFilters() {
    this.filters.set({
      city: '',
      contract_type: '',
      working_mode: '',
      education_level: '',
      experience: '',
    });

    this.currentPage.set(1);
    this.fetchJobOffer();
  }


  onPageChange(page: number) {
    this.currentPage.set(page);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


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
    let Tpage = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      Tpage.push(i);
    }
    return Tpage;
  }
}
