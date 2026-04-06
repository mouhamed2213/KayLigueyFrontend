import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-button',
  imports: [RouterLink],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.css',
})
export class LoginButtonComponent {
  @Input() variant: 'primary' | 'outline' = 'primary';
  @Input() routerLink?: string;

  get classes(): string {
    // base color
    const base = `
    px-4 py-2 min-w-[7rem] rounded-sm font-semibold font-headline
    transition duration-150 ease-in-out active:scale-95
    focus:outline-none focus:ring-2 focus:ring-kl-primary-red focus:ring-offset-2
  `;

    const variants = {
      primary: `
      bg-kl-primary-red border-kl-primary-red text-kl-surface hover:bg-kl-red-btn-hover hover:text-kl-text focus:ring-kl-primary-red min-w-28 flex-none rounded-sm border px-4 py-2 transition duration-150 ease-in-out hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none active:scale-95"
       `,
      outline: `
      border border-kl-primary-red text-kl-primary-red
      hover:bg-kl-primary-red hover:text-kl-surface hover:shadow-md
    `,
    };
    return base + ' ' + variants[this.variant];
  }
}
