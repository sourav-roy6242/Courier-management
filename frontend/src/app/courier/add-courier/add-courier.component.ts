import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourierService } from '../courier.service';

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

  constructor(
    private courierService: CourierService,
    private router: Router
  ) {}

  addCourier() {
    this.errorMessage = null;
    this.courierService.addCourier(this.newCourier).subscribe({
      next: () => {
        this.router.navigate(['/list']);
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