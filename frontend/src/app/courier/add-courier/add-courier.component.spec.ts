import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourierComponent } from './add-courier.component';

describe('AddCourierComponent', () => {
  let component: AddCourierComponent;
  let fixture: ComponentFixture<AddCourierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCourierComponent]
    });
    fixture = TestBed.createComponent(AddCourierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
