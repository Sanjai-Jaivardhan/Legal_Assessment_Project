import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthService } from '../authservice.service';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule // Required for [(ngModel)]
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'] // Fixed the typo
})
export class LoginPageComponent {
  username: string = ''; // Initialized to avoid errors
  password: string = ''; // Initialized to avoid errors
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }
  
  login(){
    this.authService.login({username:this.username,password:this.password}).subscribe((response:any)=>{
      localStorage.setItem('token',response.token);
    })
                                                         
  }
}


