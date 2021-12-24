import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.css']
})
export class AssignRoleComponent implements OnInit {

  public Constant : any;
  public department : any;
  public employee : any;
  public role : any;
  public frmAssignRole: FormGroup;

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 

    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Assign Role '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Assign Role');
    //meta tags set

    this.frmAssignRole = fb.group({
      'employee_id' : ['', [Validators.required]],
      'department_id' : ['', [Validators.required]],
      'role_id' : ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadEmployee();
    this.loadRole();
  }

  public loadDepartments(){

    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('token', this.Constant['API_TOKEN']);

    
    let options = this.commonservice.generateRequestHeaders(false);
    this.commonservice.SubmiPostFormData('get_department_list',body,options)
    .then((response) => {  
      //console.log(response.data);        
      if(response.status == true){
        if(response.data.length  > 0){
          this.department = response.data;
        }
        else{
          this.department = [];
        }
      }  
      else{
        this.department = [];
      }  
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  }

  public loadEmployee(){

    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('token', this.Constant['API_TOKEN']);

    
    let options = this.commonservice.generateRequestHeaders(false);
    this.commonservice.SubmiPostFormData('get_employee_list',body,options)
    .then((response) => {  
      //console.log(response.data);        
      if(response.status == true){
        if(response.data.length  > 0){
          this.employee = response.data;
        }
        else{
          this.employee = [];
        }
      }  
      else{
        this.employee = [];
      }  
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  }

  public loadRole(){

    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('token', this.Constant['API_TOKEN']);

    
    let options = this.commonservice.generateRequestHeaders(false);
    this.commonservice.SubmiPostFormData('get_role_name',body,options)
    .then((response) => {  
      //console.log(response.data);        
      if(response.status == true){
        if(response.data.length  > 0){
          this.role = response.data;
        }
        else{
          this.role = [];
        }
      }  
      else{
        this.role = [];
      }  
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  }

  submitAssignRole(){
    console.log(this.frmAssignRole.value.image);
    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('employee_id', this.frmAssignRole.value.employee_id);
    body.append('department_id', this.frmAssignRole.value.department_id);
    body.append('role_id', this.frmAssignRole.value.role_id);
    body.append('token', this.Constant['API_TOKEN']);

    let options = this.commonservice.generateRequestHeaders();
    this.commonservice.SubmiPostFormData('assign_role',body,options)
    .then((response) => {     
      this.spinner.hide();
      if(response.status == true){
        
        this.toastr.success(response.message);
        this.frmAssignRole.reset();
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
