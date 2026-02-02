import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; 
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // --- VARIABLES ---
  bmiHeight: number | null = null;
  bmiWeight: number | null = null;
  bmiResult: number | null = null;
  bmiClass: string = '';

  totalCalories: number = 0;
  calorieGoal: number = 2500;
  progressPercent: number = 0;
  progressColor: string = 'bg-success';

  isOnline: boolean = false;
  dbStatus: string = 'CHECKING...';

  // --- NEW STATES FOR FLASH FIX ---
  isLoggedIn: boolean = false;
  isLoading: boolean = true; 
  isBrowser: boolean = false; // <--- NEW FLAG

  showModal: boolean = false;
  historyList: any[] = [];

  constructor(
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Set this immediately in constructor
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // IF SERVER: Stop here. Keep isLoading = true.
    if (!this.isBrowser) {
      return; 
    }

    // IF BROWSER: Go ahead and check login
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;

    if (this.isLoggedIn) {
      this.checkDatabase();
      // Allow a tiny delay to ensure smooth transition
      setTimeout(() => { this.isLoading = false; }, 100);
    } else {
      this.dbStatus = 'GUEST MODE';
      this.isOnline = false;
      this.isLoading = false;
    }
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
        this.isLoading = false; // Stop loading when data arrives
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
}