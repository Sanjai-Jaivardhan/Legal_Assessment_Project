import { Component } from '@angular/core';
import { AuthService } from '../authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-page',
  standalone: true,
  imports: [],
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss'] // Fixed `styleUrl` to `styleUrls`
})
export class LogoutPageComponent {
  constructor(private authService: AuthService,private router:Router) {}

  logout() {
    this.authService.logout().subscribe(
      response => {
        console.log('Logout successful:', response);
        this.authService.clearToken();
        alert('You have been logged out successfully!');
        this.router.navigate(['/login'], { replaceUrl: true }).then(() => {
          window.history.pushState(null, '', '/login'); // Prevent back navigation
        });
      },
      error => {
        console.error('Logout failed:', error);
        alert('Logout failed. Please try again.');
      }
    );
  }
}
