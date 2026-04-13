import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() routerLink?: string;

  get classes(): string {
    // base color
    const base = `
      px-4 py-2 rounded-sm font-semibold font-headline
      transition duration-300  hover:-translate-y-0.5 ease-in-out active:scale-95 w-fit 
      focus:outline-none  focus:ring-kl-primary-red
       focus:ring-offset-2 cursor-pointer
    `;

    const variants = {
      primary: `
        group bg-kl-primary-red text-md hover:border-kl-primary-red
          mt-4 inline-flex items-center gap-2 rounded-sm border
          border-transparent font-semibold text-white
          hover:bg-white hover:text-black
      `,
      secondary: `
    `,
    };

    return base + ' ' + variants[this.variant];
  }
}
