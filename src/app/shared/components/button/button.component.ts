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
      px-4 py-2 min-w-[7rem] rounded-sm font-semibold font-headline
      transition duration-150 ease-in-out active:scale-95 w-20
      focus:outline-none focus:ring-2 focus:ring-kl-primary-red
       focus:ring-offset-2
    `;

    const variants = {
      primary: `
        group bg-kl-primary-red text-md hover:border-kl-primary-red
          mt-4 inline-flex w-fit items-center gap-2 rounded-sm border
          border-transparent px-5 py-2 font-semibold text-white
          transition-all duration-300 ease-out hover:-translate-y-0.5 
          hover:bg-white hover:text-black
      `,
      // focus:ring-2 focus:ring-offset-2 focus:outline-none active:scale-95"
      secondary: `
    `,
    };

    return base + ' ' + variants[this.variant];
  }
}
