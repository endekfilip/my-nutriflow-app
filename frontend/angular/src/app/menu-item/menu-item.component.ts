import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'; // Import the shared service

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css',
})
export class MenuItemComponent implements OnInit {
  inputValue: number = 0;

  // Inject ApiService instead of direct HttpClient
  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  onButtonClick() {
    if (this.inputValue <= 0) return; // Don't save empty zeros

    const caloriesPer100g = 247;
    const name = 'Roasted Pork';
    
    // Calculate and Round the result to avoid decimals like 247.99999
    const totalCalories = Math.round((this.inputValue / 100) * caloriesPer100g);

    const data = {
      name: name,
      grams: this.inputValue,
      totalCalories: totalCalories
    };

    // Send to Backend using ApiService
    this.api.addCalories(data).subscribe({
      next: (response) => {
        console.log('Calories saved', response);
        
        // --- VISUAL SUCCESS EFFECT ---
        // Get the active button that was clicked
        const btn = document.activeElement as HTMLButtonElement;
        
        // Save original style
        const originalText = "ENTER"; // Or fetch btn.innerText
        
        // Change to Green Success State
        btn.innerText = "✅ Saved!";
        btn.style.backgroundColor = "#2ecc71"; // Bright Green
        btn.style.borderColor = "#2ecc71";
        btn.style.color = "white";

        // Reset button after 1.5 seconds
        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.backgroundColor = ""; // Removes inline style (reverts to CSS)
          btn.style.borderColor = "";
          btn.style.color = "";
        }, 1500);

        // Clear the input field
        this.inputValue = 0;
      },
      error: (err) => {
        console.error('Error saving calories', err);
        alert('Failed to save data!');
      }
    });
  }
}