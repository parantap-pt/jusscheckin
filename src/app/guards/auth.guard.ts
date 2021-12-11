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
      return true;
  }
  
}
