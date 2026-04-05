import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Login } from '../../../core/models/auth.models';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly showPwd = signal(false);

  readonly justRegistered = computed(
    () => this.route.snapshot.queryParams['registered'] === 'true',
  );

  readonly form = this.fb.group({
    email: ['test@test.com', [Validators.required, Validators.email]],
    password: ['MyPassword123!', Validators.required],
    rememberMe: [false],
  });

  hasError(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  public loading() {
    return this.authService.loading();
  }

  error() {
    return this.authService.error();
  }

  // on submitting forms
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.value as Login;

    const creds: Login = { email, password };
    this.authService
      .login(creds)
      .pipe(switchMap(() => this.authService.getMe()))
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'];
          // console.log('RETURN : ', returnUrl);
          returnUrl
            ? this.router.navigateByUrl(returnUrl)
            : this.authService.redirectAfterLogin();
        },
      });
  }
}
