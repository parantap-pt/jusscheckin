import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRoomsComponent } from './assign-rooms.component';

describe('AssignRoomsComponent', () => {
  let component: AssignRoomsComponent;
  let fixture: ComponentFixture<AssignRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignRoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
