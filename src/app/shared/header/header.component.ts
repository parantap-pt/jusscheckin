import { Component, OnInit } from '@angular/core';
import { CommonService}  from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public commonservice:CommonService, public authService:AuthService, public toastr : ToastrService, private router :Router) { 

  }

  ngOnInit(): void {
  }

  logoutUser(){
    console.log('logout'+this.authService.loggedInUserId);
    if(this.authService.loggedInUserId != ''){

      let body = new FormData();
      body.append('user_id', this.authService.loggedInUserId);
      
      //let body = {'userid':userid,'auth_token':auth_token};
      let options = this.commonservice.generateRequestHeaders();
      this.commonservice.SubmiPostFormData('logout',body,options)
      .then((response) => {          
        if(response.status == true){
            this.toastr.success(response.message);
            this.authService.removeAuth();
            this.router.navigate(['/login']);
            return true;
        }else{
          if(response.message != ''){
            this.toastr.error(response.message);        
          }
          return false;
        }  
      }).catch((error) => {
        this.toastr.error('Something went wrong');
        return false;
      });
    }
  }

}
