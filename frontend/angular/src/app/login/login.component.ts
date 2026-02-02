import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {}

  onLogin() {
    const user = { username: this.username, password: this.password };

    this.api.loginUser(user).subscribe({
      next: (res: any) => {
        // Save the security token (We will use this later)
        localStorage.setItem('token', res.token);
        localStorage.setItem('currentUser', res.username);
        
        alert('Login Successful!');
        this.router.navigate(['/']); // Go to Dashboard
      },
      error: (err: any) => {
        alert('Login Failed: ' + (err.error.message || 'Error'));
      }
    });
  }
}