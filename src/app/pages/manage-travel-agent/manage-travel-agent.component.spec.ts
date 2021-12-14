import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTravelAgentComponent } from './manage-travel-agent.component';

describe('ManageTravelAgentComponent', () => {
  let component: ManageTravelAgentComponent;
  let fixture: ComponentFixture<ManageTravelAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTravelAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTravelAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
