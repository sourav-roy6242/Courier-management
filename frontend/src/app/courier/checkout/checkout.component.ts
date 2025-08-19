import { Component, OnInit } from '@angular/core';
import { CourierService } from '../courier.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  couriers: any[] = [];
  totalCharges: number = 0;

  constructor(private courierService: CourierService) {}

  ngOnInit(): void {
    this.loadCouriers();
  }

  loadCouriers(): void {
    this.courierService.getCouriers().subscribe({
      next: (data: any[]) => {
        this.couriers = data;
        this.totalCharges = this.couriers.reduce((sum, courier) => sum + (courier.charges || 0), 0);
      },
      error: (err) => {
        console.error('Error loading couriers:', err);
      }
    });
  }

  confirmCheckout(): void {
    alert('Checkout confirmed successfully!');
    
  }
}
