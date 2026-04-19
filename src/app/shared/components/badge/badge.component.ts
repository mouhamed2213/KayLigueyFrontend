import { Component, input, computed } from '@angular/core';
import { WorkingMode, ContractType } from '../../../core/constant/enums';

@Component({
  selector: 'app-badge',
  standalone: true,
  templateUrl: './badge.component.html',
})
export class BadgeComponent {
  label = input('');
  customClass = input('');
}
