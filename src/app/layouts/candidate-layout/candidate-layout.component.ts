import { Component } from '@angular/core';
import { CandidateNavComponent } from '../../shared/components/candidate-nav/candidate-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-candidate-layout',
  imports: [CandidateNavComponent, RouterOutlet],
  templateUrl: './candidate-layout.component.html',
  styleUrl: './candidate-layout.component.css',
})
export class CandidateLayoutComponent {}
