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


/* Third Party Installation */
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardManagerComponent } from './pages/dashboard-manager/dashboard-manager.component';
import { LeftmenuComponent } from './shared/leftmenu/leftmenu.component';
import { ManageTaskComponent } from './pages/manage-task/manage-task.component';


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
    ManageTaskComponent
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