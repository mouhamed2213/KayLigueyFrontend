import { Component, inject, OnInit } from '@angular/core';
import { JobOfferService } from '../../../../shared/service/job_offer.service';
@Component({
  selector: 'app-offres',
  imports: [],
  templateUrl: './offres.component.html',
  styleUrl: './offres.component.css',
})
export class OffresComponent implements OnInit {
  private jobOfferService = inject(JobOfferService);
  jobOffers: string[] = [];

  ngOnInit(): void {
    this.jobOfferService.jobOffer().subscribe((data) => console.log(data));
  }
}
