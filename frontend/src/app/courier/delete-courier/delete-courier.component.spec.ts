import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCourierComponent } from './delete-courier.component';

describe('DeleteCourierComponent', () => {
  let component: DeleteCourierComponent;
  let fixture: ComponentFixture<DeleteCourierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCourierComponent]
    });
    fixture = TestBed.createComponent(DeleteCourierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
