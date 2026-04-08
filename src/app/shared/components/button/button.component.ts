import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'outline' | 'outineLoginBtn' | 'primary_light' =
    'primary';
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
    bg-kl-primary-red border-kl-primary-red 
    text-kl-surface hover:bg-kl-red-btn-hover hover:text-kl-text 
    focus:ring-kl-primary-red min-w-28 
    
    flex-none rounded-sm border px-2 py-1 
    transition duration-150 ease-in-out hover:shadow-md 
    focus:ring-2 focus:ring-offset-2 focus:outline-none active:scale-95"
     `,
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
    };
    return base + ' ' + variants[this.variant];
  }
}
