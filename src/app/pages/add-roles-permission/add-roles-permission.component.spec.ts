import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRolesPermissionComponent } from './add-roles-permission.component';

describe('AddRolesPermissionComponent', () => {
  let component: AddRolesPermissionComponent;
  let fixture: ComponentFixture<AddRolesPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRolesPermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRolesPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
