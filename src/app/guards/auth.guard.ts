import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';
import { CommonService} from '../service/common.service';
import { AuthService} from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router :Router,private commonService : CommonService,private authService : AuthService,public toastr : ToastrService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.authService.isLoggedIn) {
        let url: string = state.url;
        this.authService.authRedirectURL = url;
        this.toastr.error('Please login to continue');
        this.router.navigate(['login']);
        return false;
      }

      if(this.authService.loggedInUserData.user_type == 'm' && (next?.routeConfig?.path == 'dashboard_reception' || next?.routeConfig?.path == 'dashboard_account' || next?.routeConfig?.path == 'dashboard_owner')){
      
        this.router.navigate(['/dashboard_manager']);
        this.toastr.error('You are not allowed to access this page.');
        return false;
      
      }else if(this.authService.loggedInUserData.user_type == 'o' && (next?.routeConfig?.path == 'dashboard_reception' || next?.routeConfig?.path == 'dashboard_account' || next?.routeConfig?.path == 'dashboard_manager')){
      
        this.router.navigate(['/dashboard_owner']);
        this.toastr.error('You are not allowed to access this page.');
        return false;
      
      }else if(this.authService.loggedInUserData.user_type == 'r' && (next?.routeConfig?.path == 'dashboard_owner' || next?.routeConfig?.path == 'dashboard_account' || next?.routeConfig?.path == 'dashboard_manager')){
      
        this.router.navigate(['/dashboard_reception']);
        this.toastr.error('You are not allowed to access this page.');
        return false;
      
      }else if(this.authService.loggedInUserData.user_type == 'a' && (next?.routeConfig?.path == 'dashboard_owner' || next?.routeConfig?.path == 'dashboard_reception' || next?.routeConfig?.path == 'dashboard_manager')){
      
        this.router.navigate(['/dashboard_account']);
        this.toastr.error('You are not allowed to access this page.');
        return false;
      
      }

      return true;
  }
  
}
