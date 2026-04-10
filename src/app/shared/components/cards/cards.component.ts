import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-cards',
  imports: [LucideAngularModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  //  car take 3 styled element
  //  Title
  //  icone
  //  description

  title = input<string>();
  descripiton = input<string>();
}
