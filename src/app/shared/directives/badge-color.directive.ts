import { Directive, input, signal } from '@angular/core';

@Directive({
  selector: '[appBadgeColor]',
})
export class BadgeColorDirective {
  constructor() {}

  color = input('green');
}
