import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRolesPermissionComponent } from './manage-roles-permission.component';

describe('ManageRolesPermissionComponent', () => {
  let component: ManageRolesPermissionComponent;
  let fixture: ComponentFixture<ManageRolesPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRolesPermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRolesPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
