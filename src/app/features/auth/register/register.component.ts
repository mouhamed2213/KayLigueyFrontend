import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
// import { UserRole } from '../../../core/models/auth.models';

function passwordMatchValidator(g: AbstractControl): ValidationErrors | null {
  const pwd = g.get('password')?.value;
  const confirm = g.get('confirmPassword')?.value;
  return pwd && confirm && pwd !== confirm ? { mismatch: true } : null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly selectedRole = signal<string | null>(null);
  readonly showPwd = signal(false);

  public error = this.authService.error();
  readonly form = this.fb.group(
    {
      first_name: ['moussa', Validators.required],
      last_name: ['fall', Validators.required],
      email: ['fall@email.com', [Validators.required, Validators.email]],
      company_name: ['mycompany'],
      phone: ['772214081', [Validators.required]],
      city: ['Dakar', [Validators.required]],
      password: ['12345678sS#', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['12345678sS#', Validators.required],
      terms: [true, Validators.requiredTrue],
    },
    { validators: passwordMatchValidator },
  );

  readonly pwdScore = computed(() => {
    const v = this.form.get('password')?.value ?? '';
    let s = 0;
    if (v.length >= 8) s++;
    if (/[A-Z]/.test(v)) s++;
    if (/[0-9]/.test(v)) s++;
    if (/[^A-Za-z0-9]/.test(v)) s++;
    return s;
  });

  readonly pwdColor = computed(
    () =>
      ['#e0e0e0', '#C0152A', '#e68a00', '#2e9e5b', '#166534'][this.pwdScore()],
  );

  readonly pwdLabel = computed(
    () => ['', 'Faible', 'Moyen', 'Fort', 'Très fort'][this.pwdScore()],
  );

  roleCardClass(role: any): string {
    const base =
      'w-full text-left bg-white border-[1.5px] rounded-[14px] p-4 cursor-pointer transition-all duration-150';
    return this.selectedRole() === role
      ? `${base} border-[#C0152A] bg-[#fff5f5]`
      : `${base} border-[#e8dede] hover:border-[#C0152A] hover:bg-[#fff5f5]`;
  }

  roleIconClass(role: any): string {
    const base = 'w-9 h-9 rounded-[9px] flex items-center justify-center';
    return this.selectedRole() === role
      ? `${base} bg-[#ffe0e3]`
      : `${base} bg-[#f0f0f0]`;
  }

  roleCheckClass(role: any): string {
    const base =
      'w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-all duration-150';
    return this.selectedRole() === role
      ? `${base} bg-[#C0152A] border-[#C0152A]`
      : `${base} border-[#ddd]`;
  }

  roleTitleClass(role: any): string {
    const base = 'text-[14px] font-semibold text-left';
    return this.selectedRole() === role
      ? `${base} text-[#C0152A]`
      : `${base} text-[#1a1a1a]`;
  }

  hasError(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  hasMismatch(): boolean {
    return (
      !!this.form.errors?.['mismatch'] &&
      (this.form.get('confirmPassword')?.touched ?? false)
    );
  }

  selectRole(role: any): void {
    this.selectedRole.set(role);
    const companyCtrl = this.form.get('company_name')!;
    if (role === 'RECRUTER') {
      companyCtrl.setValidators(Validators.required);
    } else {
      companyCtrl.clearValidators();
      companyCtrl.setValue('');
    }
    companyCtrl.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.form.invalid || !this.selectedRole()) {
      this.form.markAllAsTouched();
      return;
    }
    const { confirmPassword, terms, ...rest } = this.form.value;
    const payload = { ...rest, role: this.selectedRole()! };
    // this.authService.error();

    // console.log(payload);
    this.authService.register(payload as any).subscribe({
      next: () =>
        this.router.navigate(['/auth/login'], {
          queryParams: { registered: 'true' },
        }),
    });
  }
}
