import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { JobOfferService } from '../../../../core/services/job_offer.service';
import { JobOffer } from '../../../../core/models/job_offer.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';
import { DestroyRef } from '@angular/core';

@Component({
  selector: 'app-offres',
  imports: [JsonPipe],
  templateUrl: './offres.component.html',
  styleUrl: './offres.component.css',
})
export class OffresComponent implements OnInit {
  private jobOfferService = inject(JobOfferService);
  protected jobOffers = signal<JobOffer[]>([]);
  protected isLoading = signal(true);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.jobOfferService
      .jobOffer()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ data }) => {
          console.log(data);
          this.jobOffers.set(data);
          this.isLoading.set(true);
        },
        error(err) {
          // this.isLoading.set(false);
          console.log(err);
        },
      });
  }
}
