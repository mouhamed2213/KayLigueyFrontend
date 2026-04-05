import { Component, inject, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private homeService = inject(HomeService);
  private authService = inject(AuthService);
  ngOnInit(): void {
    this.authService.getMe().subscribe();
  }
}
