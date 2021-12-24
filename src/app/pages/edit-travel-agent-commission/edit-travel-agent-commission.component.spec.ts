import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTravelAgentCommissionComponent } from './edit-travel-agent-commission.component';

describe('EditTravelAgentCommissionComponent', () => {
  let component: EditTravelAgentCommissionComponent;
  let fixture: ComponentFixture<EditTravelAgentCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTravelAgentCommissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTravelAgentCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
