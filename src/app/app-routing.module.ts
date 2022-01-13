import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedauthGuard } from './guards/loggedauth.guard';
import { AuthGuard } from './guards/auth.guard';


//Website module component
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardManagerComponent } from './pages/dashboard-manager/dashboard-manager.component';
import { ManageTaskComponent } from './pages/manage-task/manage-task.component';
import { AddGuestComponent } from './pages/add-guest/add-guest.component';
import { ManageGuestComponent } from './pages/manage-guest/manage-guest.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { AddPropertyComponent } from './pages/add-property/add-property.component';
import { ManagePropertyComponent } from './pages/manage-property/manage-property.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { EditGuestComponent } from './pages/edit-guest/edit-guest.component';
import { EditPropertyComponent } from './pages/edit-property/edit-property.component';
import { AddTravelAgentComponent } from './pages/add-travel-agent/add-travel-agent.component';
import { ManageTravelAgentComponent } from './pages/manage-travel-agent/manage-travel-agent.component';
import { AddRolesPermissionComponent } from './pages/add-roles-permission/add-roles-permission.component';
import { ManageRolesPermissionComponent } from './pages/manage-roles-permission/manage-roles-permission.component';
import { AddRoomServiceComponent } from './pages/add-room-service/add-room-service.component';
import { AddCouponCodeComponent } from './pages/add-coupon-code/add-coupon-code.component';
import { ManageCouponCodeComponent } from './pages/manage-coupon-code/manage-coupon-code.component';
import { EditCouponCodeComponent } from './pages/edit-coupon-code/edit-coupon-code.component';
import { EditRolesPermissionComponent } from './pages/edit-roles-permission/edit-roles-permission.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { AssignTasksComponent } from './pages/assign-tasks/assign-tasks.component';
import { AddTravelAgentCommissionComponent } from './pages/add-travel-agent-commission/add-travel-agent-commission.component';
import { AddRestaurantsComponent } from './pages/add-restaurants/add-restaurants.component';
import { ManageTravelAgentCommissionComponent } from './pages/manage-travel-agent-commission/manage-travel-agent-commission.component';
import { ContentComponent } from './pages/content/content.component';
import { AddAgencyComponent } from './pages/add-agency/add-agency.component';
import { ManageAgencyComponent } from './pages/manage-agency/manage-agency.component';
import { DashboardOwnerComponent } from './pages/dashboard-owner/dashboard-owner.component';
import { EditTravelAgentCommissionComponent } from './pages/edit-travel-agent-commission/edit-travel-agent-commission.component';
import { AddDepartmentComponent } from './pages/add-department/add-department.component';
import { AssignRoleComponent } from './pages/assign-role/assign-role.component';
import { AddBookingComponent } from './pages/add-booking/add-booking.component';
import { DashboardReceptionComponent } from './pages/dashboard-reception/dashboard-reception.component';
import { AssignRoomsComponent } from './pages/assign-rooms/assign-rooms.component';
import { DashboardAccountComponent } from './pages/dashboard-account/dashboard-account.component';
import { CheckoutGuestDetailsComponent } from './pages/checkout-guest-details/checkout-guest-details.component';
import { CheckListComponent } from './pages/check-list/check-list.component';
import { CheckinComponent } from './pages/checkin/checkin.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
  { 
    path: 'login', 
    canActivate: [LoggedauthGuard],
    component: LoginComponent 
  },
  { 
    path: 'signup', 
    canActivate: [LoggedauthGuard],
    component: SignupComponent 
  },
  { 
    path: 'dashboard', 
    canActivate : [AuthGuard],
    component: DashboardComponent 
  },
  { 
    path: 'dashboard_manager', 
    canActivate : [AuthGuard],
    component: DashboardManagerComponent 
  },
  { 
    path: 'add-task', 
    canActivate : [AuthGuard],
    component: AddTaskComponent 
  },
  { 
    path: 'manage-task', 
    canActivate : [AuthGuard],
    component: ManageTaskComponent 
  },
  { 
    path: 'add-guest', 
    canActivate : [AuthGuard],
    component: AddGuestComponent 
  },
  { 
    path: 'manage-guest', 
    canActivate : [AuthGuard],
    component: ManageGuestComponent 
  },
  { 
    path: 'add-property', 
    canActivate : [AuthGuard],
    component: AddPropertyComponent 
  },
  { 
    path: 'manage-property', 
    canActivate : [AuthGuard],
    component: ManagePropertyComponent 
  },
  { 
    path: 'edit-task/:id', 
    canActivate : [AuthGuard],
    component: EditTaskComponent 
  },
  { 
    path: 'edit-guest/:id', 
    canActivate : [AuthGuard],
    component: EditGuestComponent 
  },
  { 
    path: 'edit-property/:id', 
    canActivate : [AuthGuard],
    component: EditPropertyComponent 
  },
  { 
    path: 'add-travel-agent', 
    canActivate : [AuthGuard],
    component: AddTravelAgentComponent 
  },
  { 
    path: 'manage-travel-agent', 
    canActivate : [AuthGuard],
    component: ManageTravelAgentComponent 
  },
  { 
    path: 'add-roles-permission', 
    canActivate : [AuthGuard],
    component: AddRolesPermissionComponent 
  },
  { 
    path: 'manage-roles-permission', 
    canActivate : [AuthGuard],
    component: ManageRolesPermissionComponent 
  },
  { 
    path: 'add-room-service', 
    canActivate : [AuthGuard],
    component: AddRoomServiceComponent 
  },
  { 
    path: 'add-coupon-code', 
    canActivate : [AuthGuard],
    component: AddCouponCodeComponent 
  },
  { 
    path: 'edit-coupon-code/:id', 
    canActivate : [AuthGuard],
    component: EditCouponCodeComponent 
  },
  { 
    path: 'edit-roles-permission/:id', 
    canActivate : [AuthGuard],
    component: EditRolesPermissionComponent 
  },
  { 
    path: 'manage-coupon-code', 
    canActivate : [AuthGuard],
    component: ManageCouponCodeComponent 
  },
  { 
    path: 'add-employee', 
    canActivate : [AuthGuard],
    component: AddEmployeeComponent 
  },
  { 
    path: 'assign-tasks', 
    canActivate : [AuthGuard],
    component: AssignTasksComponent 
  },
  { 
    path: 'add-travel-agent-commission', 
    canActivate : [AuthGuard],
    component: AddTravelAgentCommissionComponent 
  },
  { 
    path: 'add-restaurants', 
    canActivate : [AuthGuard],
    component: AddRestaurantsComponent 
  },
  { 
    path: 'manage-travel-agent-commission', 
    canActivate : [AuthGuard],
    component: ManageTravelAgentCommissionComponent 
  },
  { 
    path: 'content/:name', 
    component: ContentComponent 
  },
  { 
    path: 'add-agency', 
    canActivate : [AuthGuard],
    component: AddAgencyComponent 
  },
  { 
    path: 'manage-agency', 
    canActivate : [AuthGuard],
    component: ManageAgencyComponent 
  },
  { 
    path: 'dashboard_owner', 
    canActivate : [AuthGuard],
    component: DashboardOwnerComponent 
  },
  { 
    path: 'edit-travel-agent-commission/:id', 
    canActivate : [AuthGuard],
    component: EditTravelAgentCommissionComponent 
  },
  { 
    path: 'add-department', 
    canActivate : [AuthGuard],
    component: AddDepartmentComponent 
  },
  { 
    path: 'assign-role', 
    canActivate : [AuthGuard],
    component: AssignRoleComponent 
  },
  { 
    path: 'add-booking', 
    canActivate : [AuthGuard],
    component: AddBookingComponent 
  },
  { 
    path: 'dashboard_reception', 
    canActivate : [AuthGuard],
    component: DashboardReceptionComponent 
  },
  { 
    path: 'assign-rooms', 
    canActivate : [AuthGuard],
    component: AssignRoomsComponent 
  },
  { 
    path: 'checkout-guest-details', 
    canActivate : [AuthGuard],
    component: CheckoutGuestDetailsComponent 
  },
  { 
    path: 'check-list', 
    canActivate : [AuthGuard],
    component: CheckListComponent 
  },
  { 
    path: 'dashboard_account', 
    canActivate : [AuthGuard],
    component: DashboardAccountComponent 
  },
  { 
    path: 'checkin', 
    canActivate : [AuthGuard],
    component: CheckinComponent 
  },
  { 
    path: '**', 
    component: PagenotfoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
