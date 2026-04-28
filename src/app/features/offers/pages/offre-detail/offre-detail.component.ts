import {
  ApplicationStatus,
} from './../../../../core/constant/application-status';
import { JobOfferService } from './../../services/job-offer.service';
import { JobOffer } from './../../../../core/models/job-offer.model';
import { AuthService } from './../../../../core/services/auth.service';
import {
  Component,
  inject,
  OnInit,
  DestroyRef,
  signal,
  PLATFORM_ID,
  DOCUMENT,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CONTRACT_TYPE_CONFIG } from '../../../../core/constant/contract-types';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { WORKING_MODE_CONFIG } from '../../../../core/constant/working-mode';
import { FormatSalaryPipe } from '../../../../shared/pipes/format-salary.pipe';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RelativeTimePipe } from '../../../../shared/pipes/relative-time.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IApplication, ICreateApplication } from '../../../../core/models';
import { ApplicationService } from '../../../../core/services/application.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-offre-detail',
  imports: [
    LucideAngularModule,
    BadgeComponent,
    FormatSalaryPipe,
    ButtonComponent,
    RelativeTimePipe,
  ],
  templateUrl: './offre-detail.component.html',
  styleUrl: './offre-detail.component.css',
})
export class OffreDetailComponent implements OnInit {
  private jobOfferService = inject(JobOfferService);
  private applicationService = inject(ApplicationService);
  private document = inject(DOCUMENT); // access dom document
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  protected jobOffer = signal<any>('');
  protected errors = signal<string | null>(null);
  protected snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);
  private router = inject(Router);
  private userId = signal<string>('');
  private jobOfferId = signal<string>('');
  protected applicationStatus = signal<ApplicationStatus | undefined | null>(
    null,
  );
  protected appliedJobOffer = signal<IApplication | null>(null);

  workingModeMap = WORKING_MODE_CONFIG;
  contractTypeMap = CONTRACT_TYPE_CONFIG;

  ngOnInit(): void {
    // get Job offer Param
    this.route.params.subscribe({
      next: (jobOfferId) => {
        this.jobOfferId.set(jobOfferId['id']);
      },
    });

    if (this.authService.isAuthenticated()) {
      // Get user Id
      this.authService.getUser().subscribe({
        next: (user) => {
          this.userId.set(user?.id as string);

          // ============ if out the user id become null (Should Be fix itt)
          this.applicationService
            .currentJobOffer(this.jobOfferId(), this.userId())
            .subscribe({
              next: ({ data }) => {
                this.appliedJobOffer.set(data);
                // this.applicationStatus.set(this.appliedJobOffer()?.status);
                // console.log(this.appliedJobOffer());
              },
            });
        },
      });
    }

    this.fetchData();

    //  Request to check the status of the job offer
  }

  private fetchData() {
    // console.log(this.jobOfferId());
    return this.jobOfferService
      .getOneJobOffer(this.jobOfferId())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ data }) => {
          this.jobOffer.set(data);
          // console.log(this.jobOfferId());
        },
        error: (err) => {
          this.errors.set(
            'An error has occurred. We are unable . Please try again.',
          );
        },
      });
  }

  protected isApplied = signal<boolean>(false);

  protected onApplyClick() {
    console.log('clicked');
    const authenticated = this.authService.isAuthenticated();
    if (!authenticated) return this.router.navigateByUrl('/register');

    const applicationInfo: ICreateApplication = {
      candidat_id: this.userId(),
      jobOffer_id: this.jobOfferId(),
      // cover_letter: '', // to implemnet
    };

    // ADD APPLIED JOB INFO
    this.applicationService.applyToJobOffer(applicationInfo).subscribe({
      next: (result) => {
        if (result.success) {
          this.snackBar.open('offre postulee avec succes', 'Fermer', {
            duration: 2000,
          });
          this.isApplied.set(result.success);
        }
      },
    });

    return;
  }

  //  Display a message depending on the application status
  // Each statut has his own personalized message and can be displayed in many place
  // Dependending on the condition
  statusMessage() {
    switch (this.applicationStatus()) {
      case 'SUBMITTED':
        return `Votre demande pour cette offre a etait pris bien envoye. Nous allons vous vour retourner dans les prochain jours`;
    }

    return;
  }
  // SHARE JOB
  onShare(sharedType: 'copy' | 'whatsapp' | 'linkedin') {
    if (!isPlatformBrowser(this.platformId)) return;

    const url = this.document.location.href;
    const title = 'Découvrez cette offre !';

    switch (sharedType) {
      case 'copy':
        navigator.clipboard.writeText(url);
        this.snackBar.open('Lien copié !', 'close', {
          duration: 3000,
          horizontalPosition: 'right',
        });

        break;

      case 'whatsapp':
        const waUrl = `https://wa.me/${encodeURIComponent(title + ' ' + url)}`;
        navigator.share();
        break;

      case 'linkedin':
        const liUrl = `https://linkedin.com/${encodeURIComponent(url)}`;
        window.open(liUrl, '_blank');
        break;
    }
  }

  // SAVE JOB
  onSaveClick() {
    const authenticated = this.authService.isAuthenticated();
    console.log(authenticated);
    if (!authenticated) {
      return this.router.navigateByUrl('/register');
    } else {
      console.log('clicked');
    }
    return;
  }

  isExpiringSoon(string: any) {
    return false;
  }

  formatExperience(experience: number) {
    if (experience === 0) {
      const formated = `${0} ans (Debutant) `;
      return formated;
    }
    return;
  }

  formatExpiry(expiryDate: any) {
    const date = new Date(expiryDate);
    return date.toLocaleDateString('fr-FR');
  }
}
