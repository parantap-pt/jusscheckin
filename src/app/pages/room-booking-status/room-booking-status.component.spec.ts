import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomBookingStatusComponent } from './room-booking-status.component';

describe('RoomBookingStatusComponent', () => {
  let component: RoomBookingStatusComponent;
  let fixture: ComponentFixture<RoomBookingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomBookingStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomBookingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
