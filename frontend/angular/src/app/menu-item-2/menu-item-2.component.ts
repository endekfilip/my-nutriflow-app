import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-menu-item-2',
  templateUrl: './menu-item-2.component.html',
  styleUrl: './menu-item-2.component.css'
})
export class MenuItem2Component implements OnInit {
  inputValue: number = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  onButtonClick() {
    if (this.inputValue <= 0) return;

    // --- GYROS DATA ---
    const caloriesPer100g = 151; // Adjusted for Gyros
    const name = 'Gyros';
    
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