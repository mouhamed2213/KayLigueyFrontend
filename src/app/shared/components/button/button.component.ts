import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() variant:
    | 'primary'
    | 'outline'
    | 'outineLoginBtn'
    | 'primary_light'
    | 'primary_brand' = 'primary';
  @Input() routerLink?: string;

  get classes(): string {
    // base color
        const base = `
      px-4 py-2 min-w-[7rem] rounded-sm font-semibold font-headline
      transition duration-150 ease-in-out active:scale-95
      w-20
      focus:outline-none focus:ring-2 focus:ring-kl-primary-red focus:ring-offset-2
    `;

    const variants = {
      primary: `
 w-fit group mt-4 inline-flex items-center gap-2 rounded-md border border-transparent bg-kl-primary-red px-5 py-2 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white hover:text-black hover:border-kl-primary-red
    `,
    // focus:ring-2 focus:ring-offset-2 focus:outline-none active:scale-95"
      outline: `
    border border-kl-primary-red text-kl-primary-red
    hover:bg-kl-primary-red hover:text-kl-surface hover:shadow-md
  `,
      outineLoginBtn: `
    border border-none text-kl-muted
    transition transform duration-400 ease-int-out
    hover:text-kl-red-light hover:shadow-md
  `,

      primary_light: `
    bg-kl-primary-red border border-kl-primary-red rounded-lg
    text-kl-red-50   text-red-light hover:bg-red/10 
    hover:bg-white hover:text-kl-red-light
    transition transform duration-400 ease-int-out
    focus:ring-kl-primary-red min-w-28 `,

      primary_brand: ``,
    };

    return base + ' ' + variants[this.variant];
  }
}
