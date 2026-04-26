import { Component } from '@angular/core';
import { AnimateOnScrollDirective } from '../../../../core/directives/animate-on-scroll.directive';
import { CountUpDirective } from '../../../../core/directives/count-up.directive';
@Component({
  selector: 'app-about',
  imports: [AnimateOnScrollDirective, CountUpDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
