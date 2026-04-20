import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { JobOfferService } from '../../../../core/services/job_offer.service';
import { JobOffer } from '../../../../core/models/job_offer.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JsonPipe, DatePipe } from '@angular/common';
import { DestroyRef } from '@angular/core';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { LucideAngularModule, TheaterIcon } from 'lucide-angular';
import { WorkingMode, ContractType } from '../../../../core/constant/enums';
import { IPagination } from '../../../../core/models/offer_respose.model';
import { tap } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-offres',
  imports: [
    LoaderComponent,
    MatProgressSpinner,
    LucideAngularModule,
    ButtonComponent,
    BadgeComponent,
    DatePipe,
    MatPaginatorModule,
  ],
  templateUrl: './offres.component.html',
  styleUrl: './offres.component.css',
})
export class OffresComponent implements OnInit {
  // WORKING MODE MAPPING
  working_mode: Record<WorkingMode, { label: string; class: string }> = {
    REMOTE: {
      label: 'Télétravail',
      class: 'bg-green-100 text-green-700',
    },
    HYBRID: {
      label: 'Hybride',
      class: 'bg-yellow-100 text-yellow-700',
    },
    ON_SITE: {
      label: 'Présentiel',
      class: 'bg-blue-100 text-blue-700',
    },
  };

  // CONTRACT TYPE CONFIG
  contract_type: Record<ContractType, { label: string; class: string }> = {
    CDI: {
      label: 'CDI',
      class: 'bg-emerald-100 text-emerald-700',
    },
    CDD: {
      label: 'CDD',
      class: 'bg-blue-100 text-blue-700',
    },
    FREELANCE: {
      label: 'Freelance',
      class: 'bg-purple-100 text-purple-700',
    },
    STAGE: {
      label: 'Stage',
      class: 'bg-orange-100 text-orange-700',
    },
    ALTERNANCE: {
      label: 'Alternance',
      class: 'bg-pink-100 text-pink-700',
    },
  };

  private jobOfferService = inject(JobOfferService);
  protected jobOffers = signal<JobOffer[]>([]);
  protected isLoading = signal(true);
  private destroyRef = inject(DestroyRef);

  protected currentPage = signal<number>(1);
  protected totalJobs = signal<number>(0);
  protected jobPerPage = signal<number>(10);
  protected itemsPerpage = signal<number[]>([10]);
  protected totalPage = signal<number>(0);
  protected offset = signal<number>(0);

  // default pagination
  protected pagination = signal<IPagination>({
    page: 1,
    limit: 10,
    total: 0,
  });

  ngOnInit(): void {
    this.loadJobOffer(this.pagination().page, this.pagination().limit);
  }

  loadJobOffer(page: number, limit: number) {
    this.jobOfferService
      .jobOffer(page, limit)
      .pipe(
        takeUntilDestroyed(this.destroyRef),

        // tap((res) => {
        //   console.log(res);
        // }),
      )
      .subscribe({
        next: ({ data, meta }) => {
          this.jobOffers.set(data);
          this.pagination.set(meta);

          this.currentPage.set(this.pagination().page);
          this.totalJobs.set(this.pagination().total);
          this.jobPerPage.set(this.pagination().limit);
          this.totalPage.set(Math.ceil(this.totalJobs() / this.jobPerPage()));

          this.isLoading.set(false);
        },
        error: (err) => {
          this.isLoading.set(false);
          console.log(err);
        },
      });
  }

  onPageChange(currentPage: number) {
    this.isLoading.set(true);

    this.currentPage.set(currentPage);
    this.loadJobOffer(this.currentPage(), this.jobPerPage());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
