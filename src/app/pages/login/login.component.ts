import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { customValidations } from '../../validators/custom-validator';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public Constant : any;

  public frmLogin: FormGroup;

  public csValid = new customValidations();

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) {

    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Login '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Login');
    //meta tags set

    this.frmLogin = fb.group({
      'email' : ['', [Validators.required]],
      'password' : ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
  }

  submitLogin() { 
    this.spinner.show();
    if(this.frmLogin.value.email != '' && this.frmLogin.value.password != ''){

      let body = new FormData();
      body.append('email', this.frmLogin.value.email);
      body.append('password', this.frmLogin.value.password);
      body.append('token', this.Constant['API_TOKEN']);

      let options = this.commonservice.generateRequestHeaders();
      this.commonservice.SubmiPostFormData('login',body,options)
      .then((response) => {     
        this.spinner.hide();
        if(response.status == true){
          
          response.data.auth_token = response.data.auth_token;
          this.toastr.success(response.message);
          
          this.authService.grantAuth(response.data.user_id,response.data);
          //console.log(response.data.user_type);
          if(response.data.user_type == 'm'){
              this.router.navigate(['/dashboard_manager']);    
          }
          else if(response.data.user_type == 'o'){
              this.router.navigate(['/dashboard_owner']);    
          }
          //this.router.navigate(['/dashboard_manager']);
          return true;
          
        }else{
          if(response.message != ''){
            this.toastr.error(response.message);        
          }
          return false;
        }  
      }).catch((error) => {
        console.log(error);
        this.toastr.error('Something went wrong');
        return false;
      });
    }else{
        this.toastr.error('Please enter required fields');
    }
  }

}
