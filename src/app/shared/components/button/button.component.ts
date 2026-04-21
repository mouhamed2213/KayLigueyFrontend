import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() routerLink?: string[];

  get classes(): string {
    // base color
    const base = `
      inline-flex items-center justify-center gap-2
      px-4 py-2
      text-sm font-semibold font-headline
      rounded-sm
      transition-all duration-300 ease-out
      hover:-translate-y-0.5 active:scale-95
      focus:outline-none focus:ring-2 focus:ring-kl-primary-red focus:ring-offset-2
      cursor-pointer
`;

    const variants = {
      // primary with full red fielded
      primary: `
      bg-kl-primary-red text-white border border-transparent
      hover:bg-kl-primary-red/75 
        `,
      secondary: `
      border border-kl-border  text-kl-red-light bg-transparent hover:bg-kl-border-hover
    `,
    };

    return base + ' ' + variants[this.variant];
  }
}
