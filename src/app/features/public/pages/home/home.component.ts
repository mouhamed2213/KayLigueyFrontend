import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { LucideAngularModule } from 'lucide-angular';
import { CardsComponent } from '../../../../shared/components/cards/cards.component';
import { RouterLink } from '@angular/router';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';
import { CountUpDirective } from '../../../../shared/directives/count-up.directive';

@Component({
  selector: 'app-home',
  imports: [
    LucideAngularModule,
    ButtonComponent,
    CardsComponent,
    RouterLink,
    AnimateOnScrollDirective,
    CountUpDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  statClass: string = `
  uppercase text-center p-3`;
  statText: string = `
  text-[12px]`;
  statNbr: string = `
  font-bold text-4xl
  `;
}
