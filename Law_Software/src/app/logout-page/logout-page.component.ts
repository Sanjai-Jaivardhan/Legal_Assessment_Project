import { Component } from '@angular/core';
import { AuthService } from '../authservice.service';

@Component({
  selector: 'app-logout-page',
  standalone: true,
  imports: [],
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss'] // Fixed `styleUrl` to `styleUrls`
})
export class LogoutPageComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout().subscribe(
      response => {
        console.log('Logout successful:', response);
        this.authService.clearToken();
        alert('You have been logged out successfully!');
      },
      error => {
        console.error('Logout failed:', error);
        alert('Logout failed. Please try again.');
      }
    );
  }
}
