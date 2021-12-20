import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTravelAgentCommissionComponent } from './add-travel-agent-commission.component';

describe('AddTravelAgentCommissionComponent', () => {
  let component: AddTravelAgentCommissionComponent;
  let fixture: ComponentFixture<AddTravelAgentCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTravelAgentCommissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTravelAgentCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
