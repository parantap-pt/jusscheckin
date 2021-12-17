import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  public Constant : any;
  public department : any;
  public role : any;
  public property : any;
  public frmEmployee: FormGroup;

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 

    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Add Employee '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Add Employee');
    //meta tags set

    this.frmEmployee = fb.group({
      'name' : ['', [Validators.required]],
      'email' : ['', [Validators.required]],
      'contact_no' : ['', [Validators.required]],
      'department_id' : ['', [Validators.required]],
      'role_id' : ['', [Validators.required]],
      'property_id' : ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadRoles();
    this.loadProperty();
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

  public loadRoles(){

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

  public loadProperty(){

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

  submitEmployee(){
    console.log(this.frmEmployee.value.image);
    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('name', this.frmEmployee.value.name);
    body.append('email', this.frmEmployee.value.email);
    body.append('contact_no', this.frmEmployee.value.contact_no);
    body.append('department_id', this.frmEmployee.value.department_id);
    body.append('role_id', this.frmEmployee.value.role_id);
    body.append('property_id', this.frmEmployee.value.property_id);
    body.append('token', this.Constant['API_TOKEN']);

    let options = this.commonservice.generateRequestHeaders();
    this.commonservice.SubmiPostFormData('add_employee',body,options)
    .then((response) => {     
      this.spinner.hide();
      if(response.status == true){
        
        this.toastr.success(response.message);
        this.frmEmployee.reset();
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
