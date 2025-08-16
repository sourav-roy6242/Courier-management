import { Component, OnInit } from '@angular/core';
import { CourierService } from '../courier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-courier',
  templateUrl: './delete-courier.component.html',
  styleUrls: ['./delete-courier.component.css']
})
export class DeleteCourierComponent implements OnInit {
  couriers: any[] = [];
  selectedCourierId: number | null = null;

  constructor(
    private courierService: CourierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCouriers();
  }

  loadCouriers(): void {
    this.courierService.getCouriers().subscribe(
      (data) => {
        this.couriers = data;
      },
      (error) => {
        console.error('Error loading couriers:', error);
      }
    );
  }

  deleteCourier() {
    if (this.selectedCourierId) {
      this.courierService.deleteCourier(this.selectedCourierId).subscribe(
        () => {
          this.loadCouriers();
          this.selectedCourierId = null;
        },
        (error) => {
          console.error('Error deleting courier:', error);
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}