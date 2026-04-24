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
import {
  JsonPipe,
  UpperCasePipe,
  LowerCasePipe,
  SlicePipe,
  DatePipe,
  isPlatformBrowser,
} from '@angular/common';
import { JobOfferService } from '../../services/job_offer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsComponent } from '../../../../shared/components/cards/cards.component';
import { LucideAngularModule } from 'lucide-angular';
import { CONTRACT_TYPE_CONFIG } from '../../../../core/constant/contractTypes';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { WORKING_MODE_CONFIG } from '../../../../core/constant/workingMode';
import { FormatSalaryPipe } from '../../../../shared/pipes/format-salary.pipe';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RelativeTimePipe } from '../../../../shared/pipes/relative-time.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private document = inject(DOCUMENT); // access dom document
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  protected jobOffer = signal<any>('');
  private jobOfferId = signal<string>('');
  protected errors = signal<string | null>(null);
  protected snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);
  private router = inject(Router);

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

  // APPLY JOB
  protected onApplyClick() {
    const authenticated = this.authService.isAuthenticated();
    console.log(authenticated);
    if (!authenticated) {
      return this.router.navigateByUrl('/register');
    }
    return;
  }

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
