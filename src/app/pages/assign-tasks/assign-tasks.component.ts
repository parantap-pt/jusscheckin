import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-assign-tasks',
  templateUrl: './assign-tasks.component.html',
  styleUrls: ['./assign-tasks.component.css']
})
export class AssignTasksComponent implements OnInit {

  public Constant : any;
  public department : any;
  public employee : any;
  public task : any;
  public frmAssignTask: FormGroup;

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 
    
    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Assign Tasks '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Assign Tasks');
    //meta tags set

    this.frmAssignTask = fb.group({
      'employee_id' : ['', [Validators.required]],
      'department_id' : ['', [Validators.required]],
      'task_id' : ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadEmployee();
    this.loadTask();
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

  public loadTask(){

    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('token', this.Constant['API_TOKEN']);

    
    let options = this.commonservice.generateRequestHeaders(false);
    this.commonservice.SubmiPostFormData('get_task_list',body,options)
    .then((response) => {  
      //console.log(response.data);        
      if(response.status == true){
        if(response.data.length  > 0){
          this.task = response.data;
        }
        else{
          this.task = [];
        }
      }  
      else{
        this.task = [];
      }  
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  }

  submitAssignTask(){
    console.log(this.frmAssignTask.value.image);
    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('employee_id', this.frmAssignTask.value.employee_id);
    body.append('department_id', this.frmAssignTask.value.department_id);
    body.append('task_id', this.frmAssignTask.value.task_id);
    body.append('token', this.Constant['API_TOKEN']);

    let options = this.commonservice.generateRequestHeaders();
    this.commonservice.SubmiPostFormData('assign_task',body,options)
    .then((response) => {     
      this.spinner.hide();
      if(response.status == true){
        
        this.toastr.success(response.message);
        this.frmAssignTask.reset();
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
