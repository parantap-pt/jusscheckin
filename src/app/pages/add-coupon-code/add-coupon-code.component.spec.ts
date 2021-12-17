import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCouponCodeComponent } from './add-coupon-code.component';

describe('AddCouponCodeComponent', () => {
  let component: AddCouponCodeComponent;
  let fixture: ComponentFixture<AddCouponCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCouponCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCouponCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
