import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {CommonService} from '../service/common.service';

@Injectable()
export class LoggedauthGuard implements CanActivate {

	constructor(private router :Router,private authService : AuthService,private commonservice : CommonService){}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		//Check for login
		if(this.authService.loggedInUserData.user_type == 'm'){
				this.router.navigate(['/dashboard_manager']);    
		}
		else if(this.authService.loggedInUserData.user_type == 'o'){
				this.router.navigate(['/dashboard_owner']);    
		}
		return true;
		
	}
}
