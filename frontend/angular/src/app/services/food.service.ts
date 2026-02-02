import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs'; // <--- Import BehaviorSubject

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = 'https://world.openfoodfacts.org/cgi/search.pl';

  // 1. Create the "Radio Station" (Source of selected food)
  private selectedFoodSource = new BehaviorSubject<any>(null);
  
  // 2. Expose the "Broadcast" as an Observable (This fixes the 'currentFood' error)
  currentFood = this.selectedFoodSource.asObservable();

  constructor(private http: HttpClient) { }

  searchFood(query: string): Observable<any> {
    const url = `${this.apiUrl}?search_terms=${query}&search_simple=1&action=process&json=1`;
    return this.http.get(url);
  }

  // 3. Function to update the value (Navbar calls this)
  updateFood(food: any) {
    this.selectedFoodSource.next(food);
  }
}