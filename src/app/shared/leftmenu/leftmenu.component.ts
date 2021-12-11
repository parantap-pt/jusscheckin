import { Component, OnInit } from '@angular/core';
import { CommonService}  from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { Router,ActivatedRoute } from '@angular/router';;
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent implements OnInit {

  constructor(private router :Router,public commonservice:CommonService,public toastr : ToastrService,public authService:AuthService, public route: ActivatedRoute) { }

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
