import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // <--- Import HttpHeaders
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // --- HELPER: Get Token from Storage ---
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // --- AUTH METHODS ---
  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user);
  }

  // --- SECURE METHODS (Now use getAuthHeaders) ---
  
  addCalories(data: any) {
    // We pass the headers as the second argument
    return this.http.post(`${this.baseUrl}/saveCalories`, data, this.getAuthHeaders());
  }

  getCalories() {
    return this.http.get(`${this.baseUrl}/getAllCalories`, this.getAuthHeaders());
  }

  getTotalCalories() {
    return this.http.get(`${this.baseUrl}/calculateTotalCalories`, this.getAuthHeaders());
  }

  deleteCalories() {
    return this.http.delete(`${this.baseUrl}/clearCalories`, this.getAuthHeaders());
  }

  deleteCalorieItem(id: string) {
    return this.http.delete(`${this.baseUrl}/calories/${id}`, this.getAuthHeaders());
  }
}