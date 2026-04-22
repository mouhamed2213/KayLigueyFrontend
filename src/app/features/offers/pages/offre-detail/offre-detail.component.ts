import { Component, inject, OnInit, DestroyRef, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { JobOfferService } from '../../services/job_offer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-offre-detail',
  imports: [JsonPipe],
  templateUrl: './offre-detail.component.html',
  styleUrl: './offre-detail.component.css',
})
export class OffreDetailComponent implements OnInit {
  private jobOfferService = inject(JobOfferService);
  private destroyRef = inject(DestroyRef);

  private route = inject(ActivatedRoute);
  protected jobOffer: any;
  private jobOfferId = signal<string>('');
  protected errors = signal<string | null>(null);

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (jobOfferId) => {
        // console.log(jobOfferId['id']);
        this.jobOfferId.set(jobOfferId['id']);
      },
    });

    this.fetchData();
  }

  private fetchData() {
    console.log(this.jobOfferId());
    return this.jobOfferService
      .getOneJobOffer(this.jobOfferId())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.jobOffer = data;
        },
        error: (err) => {
          this.errors.set(
            'An error has occurred. We are unable . Please try again.',
          );
        },
      });
  }
}
