import { inject, Component, OnInit } from '@angular/core';
import { JobOfferService } from '../../../../features/offers/services/job-offer.service';

@Component({
  selector: 'app-application',
  imports: [],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css',
})
export class ApplicationComponent implements OnInit {
  private jobOfferService = inject(JobOfferService);

  ngOnInit(): void {
    this.jobOfferService
      .allAppliedsByUser('e91668c2-839a-43f5-8203-5a392a9643b4')
      .subscribe({
        next: (data) => {
          console.log(data);
        },
      });
  }
}
