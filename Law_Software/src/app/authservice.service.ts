import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient,private router:Router) {}

  // Register a new user
  register(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Login user and retrieve token
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Logout user and invalidate token
  logout(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found for logout');
    }
    const headers = new HttpHeaders({ Authorization: token });
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }

  // Save token in localStorage
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Retrieve token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Clear token from localStorage
  clearToken(): void {
    localStorage.removeItem('token');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      // Token is not present, navigate to login
      this.router.navigate(['/login']);
    }
  }
}
