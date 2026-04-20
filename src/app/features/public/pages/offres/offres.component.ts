import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
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
import { LucideAngularModule } from 'lucide-angular';
import { WorkingMode, ContractType } from '../../../../core/constant/enums';
import { IPagination } from '../../../../core/models/offer_respose.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-offres',
  imports: [
    LoaderComponent,
    MatProgressSpinner,
    LucideAngularModule,
    ButtonComponent,
    BadgeComponent,
    DatePipe,
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
  protected pagination = signal({}); // metadat containing pagination data
  protected isLoading = signal(true);
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.jobOfferService
      .jobOffer()
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
          this.isLoading.set(false);
        },
        error: (err) => {
          this.isLoading.set(false);
          console.log(err);
        },
      });
  }
}
