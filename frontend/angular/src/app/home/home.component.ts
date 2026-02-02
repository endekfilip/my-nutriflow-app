import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ApiService } from '../api.service';
import { FoodService } from '../services/food.service'; // <--- IMPORT SERVICE

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // --- VARIABLES ---
  
  // BMI Variables
  bmiHeight: number | null = null;
  bmiWeight: number | null = null;
  bmiResult: number | null = null;
  bmiClass: string = '';

  // Dashboard Variables
  totalCalories: number = 0;
  calorieGoal: number = 2500;
  progressPercent: number = 0;
  progressColor: string = 'bg-success';

  // App State
  isOnline: boolean = false;
  dbStatus: string = 'CHECKING...';
  isLoggedIn: boolean = false;
  isLoading: boolean = true;
  isBrowser: boolean = false;

  // Modal / History
  showModal: boolean = false;
  historyList: any[] = [];

  // --- NEW "QUICK LOG" VARIABLES ---
  quickFoodName: string = '';
  quickCaloriesPer100g: number = 0;
  quickGrams: number = 100; // Default portion

  constructor(
    private api: ApiService,
    private foodService: FoodService, // <--- INJECT SERVICE
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }

    // 1. Check Login Status
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;

    if (this.isLoggedIn) {
      this.checkDatabase();
      setTimeout(() => { this.isLoading = false; }, 100);
    } else {
      this.dbStatus = 'GUEST MODE';
      this.isOnline = false;
      this.isLoading = false;
    }

    // 2. LISTEN FOR SEARCH RESULTS FROM NAVBAR
    // This connects the search bar to the "Quick Log" card
    this.foodService.currentFood.subscribe((food: any) => { 
      if (food) {
        // Auto-fill the Quick Log form
        this.quickFoodName = food.name;
        this.quickCaloriesPer100g = food.calories;
        
        console.log('Received food from search:', food);
      }
    });
  }

  // --- HELPER: Calculate Calories Live ---
  get calculatedCalories(): number {
    return Math.round((this.quickCaloriesPer100g * this.quickGrams) / 100);
  }

  // --- NEW: Add Quick Food Function ---
  addQuickFood() {
    if (!this.quickFoodName || this.quickGrams <= 0) return;

    const foodData = {
      name: this.quickFoodName,
      grams: this.quickGrams,
      totalCalories: this.calculatedCalories
    };

    // Use 'addCalories' to match your api.service.ts
    this.api.addCalories(foodData).subscribe({ 
      next: (res: any) => {
        alert(`Successfully added ${this.quickFoodName}!`);
        this.checkDatabase(); // Refresh the total

        // Reset the form
        this.quickFoodName = '';
        this.quickCaloriesPer100g = 0;
        this.quickGrams = 100;
      },
      error: (err: any) => {
        console.error('Error adding food:', err);
        alert('Failed to add food. Are you logged in?');
      }
    });
  }

  // --- BMI Logic ---
  calculateBMI() {
    if (this.bmiHeight && this.bmiWeight) {
      const heightInMeters = this.bmiHeight / 100;
      this.bmiResult = this.bmiWeight / (heightInMeters * heightInMeters);
      this.bmiResult = parseFloat(this.bmiResult.toFixed(1));

      if (this.bmiResult < 18.5) this.bmiClass = 'Underweight';
      else if (this.bmiResult < 24.9) this.bmiClass = 'Normal';
      else if (this.bmiResult < 29.9) this.bmiClass = 'Overweight';
      else this.bmiClass = 'Obese';
    } else {
      alert('Please enter both height and weight!');
    }
  }

  // --- Check Database ---
  checkDatabase() {
    if (!this.isLoggedIn) return;

    this.api.getTotalCalories().subscribe({
      next: (data: any) => {
        this.isOnline = true;
        this.dbStatus = 'ONLINE';
        this.totalCalories = Math.round(data.totalCalories || 0);
        this.updateProgress();
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isOnline = false;
        this.dbStatus = 'OFFLINE';
        console.error('DB Error:', err);
        this.isLoading = false;
      }
    });
  }

  updateProgress() {
    this.progressPercent = (this.totalCalories / this.calorieGoal) * 100;
    if (this.progressPercent < 50) this.progressColor = 'bg-success';
    else if (this.progressPercent < 80) this.progressColor = 'bg-warning';
    else this.progressColor = 'bg-danger';
  }

  // --- History Logic ---
  openHistory() {
    this.showModal = true;
    this.api.getCalories().subscribe({
      next: (data: any) => { this.historyList = data as any[]; },
      error: (err: any) => console.error(err)
    });
  }

  closeHistory() {
    this.showModal = false;
  }

  clearLog() {
    if(confirm('Are you sure you want to clear your food history?')) {
      this.api.deleteCalories().subscribe({
        next: () => {
          this.historyList = [];
          this.totalCalories = 0;
          this.updateProgress();
          this.showModal = false;
          alert('History Cleared!');
        },
        error: (err: any) => console.error(err)
      });
    }
  }

  deleteItem(id: string) {
    if (!confirm('Remove this item?')) return;

    this.api.deleteCalorieItem(id).subscribe({
      next: () => {
        // 1. Remove item from local list (instant UI update)
        this.historyList = this.historyList.filter(item => item._id !== id);
        
        // 2. Refresh the total calories on the dashboard
        this.checkDatabase();
      },
      error: (err) => alert('Error deleting item')
    });
  }
}