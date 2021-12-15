import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { customValidations } from '../../validators/custom-validator';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public Constant : any;

  public frmRegistration: FormGroup;

  public csValid = new customValidations();

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService) {

    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Signup '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Signup - '+this.Constant['SITE_NM']);
    //meta tags set

    this.frmRegistration = fb.group({
      'firstName' : ['', [Validators.required]],
      'lastName' : ['', [Validators.required]],
      'email' : ['', [Validators.required]],
      'password' : ['', [Validators.required]]
    });

   }

  ngOnInit(): void {
  }

  public submitRegistration(){

    this.spinner.show();

    let body = new FormData();
    body.append('first_name', this.frmRegistration.value.firstName);
    body.append('last_name', this.frmRegistration.value.lastName);
    body.append('email', this.frmRegistration.value.email);
    body.append('password', this.frmRegistration.value.password);
    body.append('token', this.Constant['API_TOKEN']);

    let options = this.commonservice.generateRequestHeaders(false);
    this.commonservice.SubmiPostFormData('register',body,options)
    .then((response) => {   
      this.spinner.hide();       
      if(response.status == true){
        
        this.toastr.success(response.message);
        this.router.navigate(['/login']);
        return true;
      }else{
        if(response.message != ''){
          this.toastr.error(response.message);        
        }
        return false;
      }  
    }).catch((error) => {
      this.toastr.error('Something went wrong.');
      return false;
    });
  
  }

}
