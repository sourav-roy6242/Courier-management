import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  orders: any[] = [];
  activeTab: string = 'details';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadUserOrders();
  }

  loadUserProfile(): void {
    this.http.get<any>(`${environment.apiUrl}/profile`).subscribe({
      next: userData => this.user = userData,
      error: err => console.error('Failed to load user profile', err)
    });
  }

  loadUserOrders(): void {
    this.http.get<any[]>(`${environment.apiUrl}/orders`).subscribe({
      next: ordersData => this.orders = ordersData,
      error: err => console.error('Failed to load orders', err)
    });
  }

  setTab(tabName: string): void {
    this.activeTab = tabName;
  }

  updateSettings(): void {
    alert('Settings updated!');
  }

  logout(): void {
    alert('Logged out!');
  }
}
