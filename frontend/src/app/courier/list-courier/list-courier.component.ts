import { Component, OnInit } from '@angular/core';
import { CourierService } from '../courier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-courier',
  templateUrl: './list-courier.component.html',
  styleUrls: ['./list-courier.component.css']
})
export class ListCourierComponent implements OnInit {
  couriers: any[] = [];

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

  goBack() {
    this.router.navigate(['/']);
  }
}