import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-manage-roles-permission',
  templateUrl: './manage-roles-permission.component.html',
  styleUrls: ['./manage-roles-permission.component.css']
})
export class ManageRolesPermissionComponent implements OnInit {

   public Constant : any;

   public rolesPermission: any = {data : []};

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService, public authService:AuthService) { 
    
    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Manage Roles-Permission '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Manage Roles-Permission');
    //meta tags set

  }

  ngOnInit(): void {
    this.loadAllRolesPermission();
  }

  public loadAllRolesPermission(){

    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('token', this.Constant['API_TOKEN']);

    
    let options = this.commonservice.generateRequestHeaders(false);
    this.commonservice.SubmiPostFormData('get_role_name',body,options)
    .then((response) => {  
      console.log(response.data);        
      if(response.status == true){
        if(response.data.length  > 0){
          this.rolesPermission.data = response.data;
        }
        else{
          this.rolesPermission.data = [];
        }
      }  
      else{
        this.rolesPermission.data = [];
      }  
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  }


public deleteRoles(id : string = ''){
	let exeFn = (result:any)=>{
      if(result.value){
        
        let body = new FormData();
        body.append('role_id', id);
        body.append('user_id', this.authService.loggedInUserId);
        body.append('token', this.Constant['API_TOKEN']);
    
        let options = this.commonservice.generateRequestHeaders(false);
        this.commonservice.SubmiPostFormData('delete_role',body,options)
        .then((response) => {          
          if(response.status == true){
            this.toastr.success(response.message);
            this.loadAllRolesPermission();
            return true;
          }else{
            if(response.message != ''){
              this.toastr.error(response.message);        
            }
            return false;
          }  
        }).catch((error) => {
          return false;
        });
      }
    };
    this.commonservice.showConfirmDialog('Delete','Are you sure you want to delete this Role','Yes','No',exeFn);
  }

}
