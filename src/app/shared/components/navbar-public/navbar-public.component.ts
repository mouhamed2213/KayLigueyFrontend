import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { LoginButtonComponent } from '../login-button/login-button.component';

@Component({
  selector: 'app-navbar-public',
  imports: [RouterLink, RouterLinkActive, LoginButtonComponent],
  templateUrl: './navbar-public.component.html',
  styleUrl: './navbar-public.component.css',
})
export class NavbarPublicComponent {
  private route = inject(Router);

  isActive(route: string): boolean {
    if (this.route.url === route) {
      console.log('true');
    }
    return true;
  }
}
