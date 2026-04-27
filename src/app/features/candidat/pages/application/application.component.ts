import { inject, Component, OnInit, signal } from '@angular/core';
import { JobOfferService } from '../../../../features/offers/services/job-offer.service';
import { ApplicationService } from '../../../../core/services/application.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-application',
  imports: [],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css',
})
export class ApplicationComponent implements OnInit {
  private authService = inject(AuthService);
  private applicationService = inject(ApplicationService);

  protected page = signal(1);
  protected limit = signal(3);
  paginationValue = {
    page: this.page(),
    limit: this.limit(),
  };

  // remove any on application service
  // create interceptor to format API response
  // IMPLETE APPLICATION INTERFAACE
  ngOnInit(): void {
    this.applicationService
      .allAppliedsByUser(
        'e91668c2-839a-43f5-8203-5a392a9643b4',
        this.paginationValue.page,
        this.paginationValue.limit,
      )
      .subscribe({
        next: (data) => {
          // console.log(data);
        },
      });
  }
}
