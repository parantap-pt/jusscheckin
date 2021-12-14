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
    path: '**', 
    component: PagenotfoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
