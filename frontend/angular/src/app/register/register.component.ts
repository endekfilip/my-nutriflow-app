import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {}

  onRegister() {
    if (!this.username || !this.password) {
      alert('Please fill in all fields');
      return;
    }

    const user = {
      username: this.username,
      password: this.password
    };

    this.api.registerUser(user).subscribe({
      next: (res) => {
        alert('Registration Successful! Please Login.');
        this.router.navigate(['/']); // Redirect to home (or login page later)
      },
      error: (err) => {
        console.error(err);
        alert('Registration Failed: ' + (err.error.message || 'Server Error'));
      }
    });
  }
}