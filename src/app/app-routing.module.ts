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
    path: 'manage-task', 
    canActivate : [AuthGuard],
    component: ManageTaskComponent 
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
