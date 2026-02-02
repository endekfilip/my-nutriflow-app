import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-calorie-show',
  templateUrl: './calorie-show.component.html',
  styleUrl: './calorie-show.component.css'
})
export class CalorieShowComponent {
  totalCalories: number | undefined;
  constructor(private http: HttpClient) {}

  async onDeleteAllCalories() {
    try {
      const response = await firstValueFrom(
        this.http.delete<any>('http://localhost:3000/api/deleteAllCalories')
          .pipe(
            catchError(error => {
              throw new Error(error.message);
            })
          )
      );

      console.log('All calories deleted', response);
      // Optionally, update UI or display a message
    } catch (error) {
      console.error('Error deleting calories', error);
      // Handle error, show message, etc.
    }
  }

  async onShowTotalCalories() {
    try {
      const response = await firstValueFrom(
        this.http.get<any>('http://localhost:3000/api/calculateTotalCalories')
          .pipe(
            catchError(error => {
              throw new Error(error.message);
            })
          )
      );

      this.totalCalories = response.totalCalories.toFixed(2);
    } catch (error) {
      console.error('Error calculating total calories', error);
      // Handle error, show message, etc.
    }
  }
}



