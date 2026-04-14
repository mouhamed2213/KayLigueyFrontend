import { Component, input } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  label_for = input<string>('');
  placeholder = input<string>('Moussa Fall');
  type = input<string>('text');
}
