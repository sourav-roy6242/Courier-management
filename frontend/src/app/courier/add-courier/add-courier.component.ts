import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourierService } from '../courier.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-courier',
  templateUrl: './add-courier.component.html',
  styleUrls: ['./add-courier.component.css']
})
export class AddCourierComponent {
  newCourier: any = {
    sender: '',
    recipient: '',
    address: '',
    weight: null
  };
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private courierService: CourierService,
    private router: Router
  ) {}

  addCourier() {
    this.errorMessage = null;
    this.successMessage = null;

  
    if (!this.newCourier.sender || !this.newCourier.recipient || 
        !this.newCourier.address || !this.newCourier.weight) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (this.newCourier.weight > 10) {
      this.errorMessage = 'Weight cannot exceed 10 kg';
      return;
    }

    this.courierService.addCourier(this.newCourier).subscribe({
      next: () => {
        this.successMessage = 'Courier added successfully! Redirecting...';
        setTimeout(() => {
          this.router.navigate(['/list']);
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to add courier';
        console.error('Error:', err);
      }
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}





