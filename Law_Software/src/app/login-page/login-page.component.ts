import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthService } from '../authservice.service';

import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    RouterModule// Required for [(ngModel)]
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'] // Fixed the typo
})
export class LoginPageComponent {
  username: string = ''; // Initialized to avoid errors
  password: string = ''; // Initialized to avoid errors
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }
  
  // login(){
  //   this.authService.login({username:this.username,password:this.password}).subscribe((response:any)=>{
  //     localStorage.setItem('token',response.token);
  //   })
  //   if(localStorage.getItem('token')){
  //     this.router.navigate(['/scenarios'])
  //   }                                                   
  // }

  login() {
    const startTime = new Date();
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/scenarios']);
        console.log(`Login completed in ${new Date().getTime() - startTime.getTime()}ms`);
      },
      error: (error) => {
        console.error('Login failed:', error);
        console.log(`Login failed after ${new Date().getTime() - startTime.getTime()}ms`);
        
        // Handle login failure, e.g., show an error message 
      }
    });

    
  }

  
  
}



