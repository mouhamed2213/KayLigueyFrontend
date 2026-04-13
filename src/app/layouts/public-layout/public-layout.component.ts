import { Component } from '@angular/core';
import { NavbarPublicComponent } from '../../shared/components/navbar-public/navbar-public.component';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from "../../shared/components/button/button.component";

@Component({
  selector: 'app-public-layout',
  imports: [NavbarPublicComponent, RouterOutlet, ButtonComponent],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css',
})
export class PublicLayoutComponent {}
