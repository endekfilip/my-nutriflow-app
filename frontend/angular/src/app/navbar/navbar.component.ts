import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {}

  onLogout() {
    // 1. Remove data from Local Storage
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');

    // 2. Alert the user
    alert('Successfully logged out!');

    // 3. Redirect to Home (or Login)
    this.router.navigate(['/login']);
  }
}