import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'; // Make sure this path is correct

@Component({
  selector: 'app-menu-item-1',
  templateUrl: './menu-item-1.component.html',
  styleUrl: './menu-item-1.component.css' // Note: Angular 17+ uses styleUrl (singular)
})
export class MenuItem1Component implements OnInit {
  inputValue: number = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  onButtonClick() {
    if (this.inputValue <= 0) return;

    // --- FRIES DATA ---
    const caloriesPer100g = 312; // Adjusted for Fries
    const name = 'French Fries';
    
    const totalCalories = Math.round((this.inputValue / 100) * caloriesPer100g);

    const data = {
      name: name,
      grams: this.inputValue,
      totalCalories: totalCalories
    };

    this.api.addCalories(data).subscribe({
      next: (response) => {
        // --- VISUAL SUCCESS EFFECT ---
        const btn = document.activeElement as HTMLButtonElement;
        const originalText = "ENTER"; 
        
        btn.innerText = "✅ Saved!";
        btn.style.backgroundColor = "#2ecc71"; 
        btn.style.borderColor = "#2ecc71";
        btn.style.color = "white";

        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.backgroundColor = ""; 
          btn.style.borderColor = "";
          btn.style.color = "";
        }, 1500);

        this.inputValue = 0;
      },
      error: (err) => {
        console.error('Error saving calories', err);
        alert('Failed to save data!');
      }
    });
  }
}