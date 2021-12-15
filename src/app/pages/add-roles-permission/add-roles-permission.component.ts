import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { customValidations } from '../../validators/custom-validator';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-roles-permission',
  templateUrl: './add-roles-permission.component.html',
  styleUrls: ['./add-roles-permission.component.css']
})
export class AddRolesPermissionComponent implements OnInit {

  public Constant : any;
  public frmRolesPermission: FormGroup;
  public csValid = new customValidations();
  public moduleData: any = {data : []};
  public permissionData: any = {data : []};
  public selectedModule  = null ;
  public selectedPermission  = null ;

   constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 
   	  
   	   this.Constant = this.commonservice.getConstants();
	   //meta tags set
	    var meta_tag = [
	      {name : 'og:title' , content : 'Add Roles-Permission '+' - '+this.Constant['SITE_NM']}
	    ];
	    this.commonservice.changeMetaTagOfPage(meta_tag);
	    this.commonservice.setTitle('Add Roles-Permission');
	    //meta tags set

	     this.frmRolesPermission = fb.group({
	      'rolesName' : ['', [Validators.required]],
	      'moduleName' : ['', [Validators.required]],
	      'permission' : ['', [Validators.required]]
	    });
   }

  ngOnInit(): void {
  	this.loadModule();
  	this.loadPermission();
  }

   public loadModule(){
	    let body = new FormData();
	    body.append('user_id', this.authService.loggedInUserId);
	    body.append('token', this.Constant['API_TOKEN']);
	    let options = this.commonservice.generateRequestHeaders(false);
	    this.commonservice.SubmiPostFormData('get_module_name',body,options)
	    .then((response) => {  
	      console.log(response.data);        
	      if(response.status == true){
	        if(response.data.length  > 0){
	          this.moduleData.data = response.data;
	        }
	        else{
	          this.moduleData.data = [];
	        }
	      }  
	      else{
	        this.moduleData.data = [];
	      }  
	    })
	    .catch((error) => {
	      console.log(error);
	      return false;
	    });
   }

   public loadPermission(){
	    let body = new FormData();
	    body.append('user_id', this.authService.loggedInUserId);
	    body.append('token', this.Constant['API_TOKEN']);
	    let options = this.commonservice.generateRequestHeaders(false);
	    this.commonservice.SubmiPostFormData('get_permission_list',body,options)
	    .then((response) => {  
	      console.log(response.data);        
	      if(response.status == true){
	        if(response.data.length  > 0){
	          this.permissionData.data = response.data;
	        }
	        else{
	          this.permissionData.data = [];
	        }
	      }  
	      else{
	        this.permissionData.data = [];
	      }  
	    })
	    .catch((error) => {
	      console.log(error);
	      return false;
	    });
   }

  submitRolesPermission() { 
    this.spinner.show();
    if(this.frmRolesPermission.value.rolesName != '' && this.frmRolesPermission.value.moduleName != null && this.frmRolesPermission.value.permission != null){

      let body = new FormData();
      body.append('role_name', this.frmRolesPermission.value.rolesName);
      body.append('module_id', this.frmRolesPermission.value.moduleName);
      body.append('permission_id', this.frmRolesPermission.value.permission);
      body.append('user_id', this.authService.loggedInUserId);
      body.append('token', this.Constant['API_TOKEN']);

      let options = this.commonservice.generateRequestHeaders();
      this.commonservice.SubmiPostFormData('add_role',body,options)
      .then((response) => {     
        this.spinner.hide();
        if(response.status == true){
          
          this.toastr.success(response.message);
          this.router.navigate(['/manage-roles-permission']);
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
