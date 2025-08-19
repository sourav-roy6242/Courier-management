import { Component, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements AfterViewInit {
  timelineItems: any[] = [
    { year: 2015, title: 'Founded', text: 'Started as a small courier service aiming to make deliveries faster and safer.' },
    { year: 2017, title: 'First Milestone', text: 'Expanded operations to 3 cities and introduced real-time tracking technology.' },
    { year: 2020, title: 'Growth', text: 'Surpassed 10,000 deliveries per month and launched mobile apps for customers.' },
    { year: 2024, title: 'Today', text: 'Serving nationwide with a commitment to quality, speed, and security.' }
  ];

  ngAfterViewInit() {
    this.onScroll(); 
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item) => {
      const itemTop = item.getBoundingClientRect().top;
      if (itemTop < triggerBottom) {
        item.classList.add('visible');
      }
    });
  }
}
