import { Component, inject, OnInit, DestroyRef, signal } from '@angular/core';
import {
  JsonPipe,
  UpperCasePipe,
  LowerCasePipe,
  SlicePipe,
} from '@angular/common';
import { JobOfferService } from '../../services/job_offer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CardsComponent } from '../../../../shared/components/cards/cards.component';
import { LucideAngularModule } from 'lucide-angular';
import { CONTRACT_TYPE_CONFIG } from '../../../../core/constant/contractTypes';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { WORKING_MODE_CONFIG } from '../../../../core/constant/workingMode';
import { FormatSalaryPipe } from '../../../../shared/pipes/format-salary.pipe';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
@Component({
  selector: 'app-offre-detail',
  imports: [
    CardsComponent,
    LucideAngularModule,
    BadgeComponent,
    SlicePipe,
    UpperCasePipe,
    FormatSalaryPipe,
    ButtonComponent,
  ],
  templateUrl: './offre-detail.component.html',
  styleUrl: './offre-detail.component.css',
})
export class OffreDetailComponent implements OnInit {
  private jobOfferService = inject(JobOfferService);
  private destroyRef = inject(DestroyRef);

  private route = inject(ActivatedRoute);
  protected jobOffer = signal<any>('');
  private jobOfferId = signal<string>('');
  protected errors = signal<string | null>(null);

  workingModeMap = WORKING_MODE_CONFIG;
  contractTypeMap = CONTRACT_TYPE_CONFIG;

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
    // console.log(this.jobOfferId());
    return this.jobOfferService
      .getOneJobOffer(this.jobOfferId())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ data }) => {
          this.jobOffer.set(data);
          console.log(this.jobOffer());
        },
        error: (err) => {
          this.errors.set(
            'An error has occurred. We are unable . Please try again.',
          );
        },
      });
  }
}
