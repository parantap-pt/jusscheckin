import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { customValidations } from '../../validators/custom-validator';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard-manager',
  templateUrl: './dashboard-manager.component.html',
  styleUrls: ['./dashboard-manager.component.css']
})
export class DashboardManagerComponent implements OnInit {

  public Constant : any;
  public csValid = new customValidations();

   constructor(public commonservice:CommonService) { 
   	  
   	   this.Constant = this.commonservice.getConstants();
	   //meta tags set
	    var meta_tag = [
	      {name : 'og:title' , content : 'Dashboard Manager '+' - '+this.Constant['SITE_NM']}
	    ];
	    this.commonservice.changeMetaTagOfPage(meta_tag);
	    this.commonservice.setTitle('Dashboard');
	    //meta tags set

	 }

  ngOnInit(): void {
  }
}
