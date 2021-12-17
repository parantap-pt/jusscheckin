import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCouponCodeComponent } from './manage-coupon-code.component';

describe('ManageCouponCodeComponent', () => {
  let component: ManageCouponCodeComponent;
  let fixture: ComponentFixture<ManageCouponCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCouponCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCouponCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
