import { Component, inject, OnInit } from '@angular/core';
import { JobOfferService } from '../../../../core/services/job_offer.service';
import { JobOffer } from '../../../../core/models/job_offer.model';
@Component({
  selector: 'app-offres',
  imports: [],
  templateUrl: './offres.component.html',
  styleUrl: './offres.component.css',
})
export class OffresComponent implements OnInit {
  private jobOfferService = inject(JobOfferService);
  private jobOffers: JobOffer[] = [];

  ngOnInit(): void {
    this.jobOfferService.jobOffer().subscribe({
      next(value) {
        console.log('GOT IT ', value);
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
