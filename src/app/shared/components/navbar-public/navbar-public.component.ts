import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-navbar-public',
  imports: [RouterLink, RouterLinkActive, ButtonComponent],
  templateUrl: './navbar-public.component.html',
  styleUrl: './navbar-public.component.css',
})
export class NavbarPublicComponent {
  isOpenMenu: boolean = false;
  isOpen = false;

  open() {
    this.isOpen = !this.isOpen;
    this.isOpenMenu = true;
  }

  close() {
    this.isOpen = !this.isOpen;
    this.isOpenMenu = !this.isOpenMenu;
  }
}
