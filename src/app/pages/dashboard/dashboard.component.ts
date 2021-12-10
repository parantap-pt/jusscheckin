import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { customValidations } from '../../validators/custom-validator';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public Constant : any;
  public frmLogin: FormGroup;
  public csValid = new customValidations();

   constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) {

    this.Constant = this.commonservice.getConstants();
   //meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Dashboard '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Login - '+this.Constant['SITE_NM']);
    //meta tags set
   
  }

  ngOnInit(): void {
  }

}
