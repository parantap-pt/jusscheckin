import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTravelAgentCommissionComponent } from './manage-travel-agent-commission.component';

describe('ManageTravelAgentCommissionComponent', () => {
  let component: ManageTravelAgentCommissionComponent;
  let fixture: ComponentFixture<ManageTravelAgentCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTravelAgentCommissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTravelAgentCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
