import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from '../services/food.service'; // <--- Import FoodService

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  searchTerm: string = '';
  searchResults: any[] = [];

  constructor(private router: Router, private foodService: FoodService) {}

  // 1. SEARCH FUNCTION
  searchExternalFood() {
    if (this.searchTerm.length < 2) return; 

    this.foodService.searchFood(this.searchTerm).subscribe((data: any) => {
      this.searchResults = data.products || [];
    });
  }

  // 2. SELECT FUNCTION (Fixed)
  selectFood(product: any) {
    // A. Clear the search bar
    this.searchTerm = '';
    this.searchResults = [];
    
    // B. Prepare the data
    const cleanFoodData = {
      name: product.product_name,
      calories: product.nutriments['energy-kcal_100g'] || 0
    };

    // C. Send it to the Home Component! (This updates the Quick Log)
    this.foodService.updateFood(cleanFoodData);
  }

  // 3. LOGOUT FUNCTION
  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    alert('Successfully logged out!');
    this.router.navigate(['/login']);
  }
}