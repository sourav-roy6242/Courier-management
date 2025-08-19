import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  userFirstName = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        this.userFirstName = user.firstName || '';
        this.isLoggedIn = true;
      } catch (error) {
        console.error('Error parsing user from localStorage', error);
        this.isLoggedIn = false;
        this.userFirstName = '';
      }
    } else {
      this.isLoggedIn = false;
      this.userFirstName = '';
    }
  }

  checkLoginAndNavigate(route: string) {
    if (this.isLoggedIn) {
      console.log('Clicked route:', route, 'isLoggedIn:', this.isLoggedIn);
      this.router.navigate([route]);
    } else {
      alert('Please sign up or log in first to access this feature.');
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
    localStorage.removeItem('userToken');
    this.isLoggedIn = false;
    this.userFirstName = '';
    this.router.navigate(['/']);
  }

  checkout() {
    if (this.isLoggedIn) {
      this.router.navigate(['checkout']);
    } else {
      alert('Please sign up or log in first to access the checkout.');
      this.router.navigate(['/login']);
    }
  }
  

  getUserInitial(): string {
    return this.userFirstName?.charAt(0)?.toUpperCase() || '';
  }
}
