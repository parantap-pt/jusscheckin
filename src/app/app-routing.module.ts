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
    path: '**', 
    component: PagenotfoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
