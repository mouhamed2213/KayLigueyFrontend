import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-input',
  imports: [LucideAngularModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  label_for = input<string>('');
  placeholder = input<string>('Moussa Fall');
  type = input<string>('text');
  inputStyle = input<string>('');
}
