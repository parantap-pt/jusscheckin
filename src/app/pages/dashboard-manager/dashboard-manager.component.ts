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
  public property: any;
  public frmProperty: FormGroup;
  public property_data: any = {data : []};

   constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService, public authService:AuthService) { 
   	  
   	   this.Constant = this.commonservice.getConstants();
	   //meta tags set
	    var meta_tag = [
	      {name : 'og:title' , content : 'Dashboard Manager '+' - '+this.Constant['SITE_NM']}
	    ];
	    this.commonservice.changeMetaTagOfPage(meta_tag);
	    this.commonservice.setTitle('Dashboard');
	    //meta tags set

		this.frmProperty = fb.group({
			'property_id' : ['', [Validators.required]]
		});

	 }

  ngOnInit(): void {
	this.loadAllProperty();
  }

  public loadAllProperty(){

    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('token', this.Constant['API_TOKEN']);

    
    let options = this.commonservice.generateRequestHeaders(false);
    this.commonservice.SubmiPostFormData('get_my_property',body,options)
    .then((response) => {  
      //console.log(response.data);        
      if(response.status == true){
        if(response.data.length  > 0){
          this.property = response.data;
        }
        else{
          this.property = [];
        }
      }  
      else{
        this.property = [];
      }  
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  }

  submitProperty(){
    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('property_id', this.frmProperty.value.property_id);
    body.append('token', this.Constant['API_TOKEN']);

    let options = this.commonservice.generateRequestHeaders();
    this.commonservice.SubmiPostFormData('onwer_dashboard',body,options)
    .then((response) => {     
      this.spinner.hide();
      if(response.status == true){
        if(response.data.length  > 0){
          console.log(response.data[0].available_room)
          this.property_data = response.data[0];
        }
        else{
          this.property_data = [];
        }
      }  
      else{
        this.property_data = [];
      }  
    }).catch((error) => {
      console.log(error);
      this.toastr.error('Something went wrong');
      return false;
    });
  }
}
