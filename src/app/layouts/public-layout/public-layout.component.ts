import { Component } from '@angular/core';
import { NavbarPublicComponent } from '../../shared/components/navbar-public/navbar-public.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
 @Component({
  selector: 'app-public-layout',
  imports: [NavbarPublicComponent, RouterOutlet, FooterComponent],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css',
})
export class PublicLayoutComponent {}
