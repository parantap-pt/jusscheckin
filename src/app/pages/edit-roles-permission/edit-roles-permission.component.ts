import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { customValidations } from '../../validators/custom-validator';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-roles-permission',
  templateUrl: './edit-roles-permission.component.html',
  styleUrls: ['./edit-roles-permission.component.css']
})
export class EditRolesPermissionComponent implements OnInit {

  public Constant : any;
  public frmRolesPermission: FormGroup;
  public role_id: any;
  public moduleData: any = {data : []};
  public permissionData: any = {data : []};
  public selectedModule  = null ;
  public selectedPermission  = null ;
  public rolesData :any ;

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 

    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Edit Roles Permission '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Edit Roles Permission');
    //meta tags set

    this.frmRolesPermission = fb.group({
      'rolesName' : ['', [Validators.required]],
      'moduleName' : ['', [Validators.required]],
      'permission' : ['', [Validators.required]]
    });

    this.role_id = this.activatedRoute.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.loadModule();
  	this.loadPermission();

    if(this.authService.isLoggedIn){  
      let body = new FormData();
      body.append('user_id', this.authService.loggedInUserId);
      body.append('role_id', this.role_id);
      body.append('token', this.Constant['API_TOKEN']);

      let options = this.commonservice.generateRequestHeaders();
      this.commonservice.SubmiPostFormData('get_role_details',body,options)
      .then((response) => {          
        if(response.status == true){
          this.rolesData = response.data[0];
          console.log(this.rolesData) ;
          this.frmRolesPermission.controls['rolesName'].setValue(this.rolesData.role_name);
          this.frmRolesPermission.controls['moduleName'].setValue(this.rolesData.module_id);
          this.frmRolesPermission.controls['permission'].setValue(this.rolesData.permission_id);
         }  
      });
    }
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

  submitRolesPermission(){
	    let body = new FormData();
	    body.append('user_id', this.authService.loggedInUserId);
	    body.append('role_id', this.role_id);
	    body.append('role_name', this.frmRolesPermission.value.rolesName);
	    body.append('module_id', this.frmRolesPermission.value.moduleName);
	    body.append('permission_id', this.frmRolesPermission.value.permission);
	    body.append('token', this.Constant['API_TOKEN']);

	    let options = this.commonservice.generateRequestHeaders();
	    this.commonservice.SubmiPostFormData('edit_role',body,options)
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
  }

  

}
