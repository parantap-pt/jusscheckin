import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutGuestDetailsComponent } from './checkout-guest-details.component';

describe('CheckoutGuestDetailsComponent', () => {
  let component: CheckoutGuestDetailsComponent;
  let fixture: ComponentFixture<CheckoutGuestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutGuestDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutGuestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
