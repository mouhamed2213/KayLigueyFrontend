import { Component } from '@angular/core';
import { NavbarPublicComponent } from '../../shared/components/navbar-public/navbar-public.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  imports: [NavbarPublicComponent, RouterOutlet],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css',
})
export class PublicLayoutComponent {}
