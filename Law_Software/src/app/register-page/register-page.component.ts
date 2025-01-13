import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../authservice.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    FormsModule,MatToolbarModule,MatCardModule,MatInputModule
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  register() {
    this.authService.register({ username: this.username, password: this.password }).subscribe(
      response => {
        console.log('User registered successfully', response);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 201) {
          console.log('User registered successfully', error);
        } else {
          console.error('An error occurred:', error);
        }
      }
    );
  }
}
