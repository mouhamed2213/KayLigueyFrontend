import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-navbar-public',
  imports: [RouterLink, RouterLinkActive, ButtonComponent],
  templateUrl: './navbar-public.component.html',
  styleUrl: './navbar-public.component.css',
})
export class NavbarPublicComponent {
  private route = inject(Router);

  isActive(): string {
    return `text-kl-red-light border-kl-red-light`;
  }
  get class(): string {
    return `
      text-kl-muted font-headline hover:border-kl-red-light 
      hover:text-kl-red-light border-b-2 border-transparent 
      p-1 font-semibold transition duration-150 ease-in-out hover:scale-105
`;
  }
}
