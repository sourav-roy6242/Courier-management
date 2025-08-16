import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCourierComponent } from './list-courier.component';

describe('ListCourierComponent', () => {
  let component: ListCourierComponent;
  let fixture: ComponentFixture<ListCourierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCourierComponent]
    });
    fixture = TestBed.createComponent(ListCourierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
