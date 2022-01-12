import { NgModule,APP_INITIALIZER } from '@angular/core';
import { BrowserModule,Title } from '@angular/platform-browser';
import { HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';


/* Service Installation */
import { CommonService } from './service/common.service';
import { AuthService } from './service/auth.service';
/* Service Installation */

/* Auth Guards */
import { LoggedauthGuard } from './guards/loggedauth.guard';
/* Auth Guards */


/* Third Party Installation */
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardManagerComponent } from './pages/dashboard-manager/dashboard-manager.component';
import { LeftmenuComponent } from './shared/leftmenu/leftmenu.component';
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
import { EditCouponCodeComponent } from './pages/edit-coupon-code/edit-coupon-code.component';
import { ManageCouponCodeComponent } from './pages/manage-coupon-code/manage-coupon-code.component';
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




export function  commonServiceFactory(commonService: CommonService): Function {
  return () => commonService.load();  
}

export function  authServiceFactory(authService: AuthService): Function {
  return () => authService.load();  
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    PagenotfoundComponent,
    DashboardComponent,
    DashboardManagerComponent,
    LeftmenuComponent,
    ManageTaskComponent,
    AddGuestComponent,
    ManageGuestComponent,
    AddTaskComponent,
    AddPropertyComponent,
    ManagePropertyComponent,
    EditTaskComponent,
    EditGuestComponent,
    EditPropertyComponent,
    AddTravelAgentComponent,
    ManageTravelAgentComponent,
    AddRolesPermissionComponent,
    ManageRolesPermissionComponent,
    AddRoomServiceComponent,
    AddCouponCodeComponent,
    EditCouponCodeComponent,
    ManageCouponCodeComponent,
    EditRolesPermissionComponent,
    AddEmployeeComponent,
    AssignTasksComponent,
    AddTravelAgentCommissionComponent,
    AddRestaurantsComponent,
    ManageTravelAgentCommissionComponent,
    ContentComponent,
    AddAgencyComponent,
    ManageAgencyComponent,
    DashboardOwnerComponent,
    EditTravelAgentCommissionComponent,
    AddDepartmentComponent,
    AssignRoleComponent,
    AddBookingComponent,
    DashboardReceptionComponent,
    AssignRoomsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton:true,
      enableHtml:true
    }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    LoggedauthGuard,
    Title,
    CommonService,
    {
      provide: APP_INITIALIZER,
      useFactory: commonServiceFactory,
      deps: [CommonService],
      multi: true
    },
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: authServiceFactory,
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
