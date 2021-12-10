import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


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
    component: LoginComponent 
  },
  { 
    path: 'signup', 
    component: SignupComponent 
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent 
  },
  { 
    path: 'dashboard_manager', 
    component: DashboardManagerComponent 
  },
  { 
    path: 'manage-task', 
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
