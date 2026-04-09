import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { LucideAngularModule } from 'lucide-angular';
@Component({
  selector: 'app-home',
  imports: [LucideAngularModule, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
