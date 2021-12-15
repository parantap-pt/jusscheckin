import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomServiceComponent } from './add-room-service.component';

describe('AddRoomServiceComponent', () => {
  let component: AddRoomServiceComponent;
  let fixture: ComponentFixture<AddRoomServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoomServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoomServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
