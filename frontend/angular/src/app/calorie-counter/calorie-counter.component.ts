import {Component} from '@angular/core';

@Component({
  selector: 'app-calorie-counter',
  templateUrl: './calorie-counter.component.html',
  styleUrl: './calorie-counter.component.css'
})
export class CalorieCounterComponent {

  weight: number = 0;
  height: number = 0;
  result: string = '';
  result_classification: string = '';

  calculateBMI(): void {
    if (this.height <= 0 || this.weight <= 0) {
      this.result = 'Please enter valid height and weight.';
      return;
    } else {
      let height_cm = this.height / 100;
      const bmi = this.weight / (height_cm * height_cm);
      this.result = `${bmi.toFixed(2)}`;
      console.log(this.result);//here returns STRING, I will need this for the API
      if (bmi >= 25 && bmi <=30) {
        this.result_classification = 'Overweight'
      } else if (bmi > 30) {
        this.result_classification = 'Obese'
      } else if (bmi >= 18.5 && bmi <= 25) {
        this.result_classification = 'Normal'
      }
      else {
        this.result_classification = 'Thinness';
      }
      console.log(this.result_classification);//here returns STRING, I will need this for the API
    }
  }
}

