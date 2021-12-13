import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  public Constant : any;
  public frmEditTask: FormGroup;
  public tasks: any;
  public task_id: any;

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 
    this.Constant = this.commonservice.getConstants();
    //meta tags set
     var meta_tag = [
       {name : 'og:title' , content : 'Edit Task '+' - '+this.Constant['SITE_NM']}
     ];
     this.commonservice.changeMetaTagOfPage(meta_tag);
     this.commonservice.setTitle('Edit Task');
     //meta tags set

      this.frmEditTask = fb.group({
       'taskTitle' : ['', [Validators.required]],
       'taskTimeline' : ['', [Validators.required]],
       'taskDescription' : ['', [Validators.required]]
     });

     this.task_id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn){
  		let body = new FormData();
	    body.append('user_id', this.authService.loggedInUserId);
      body.append('task_id', this.task_id);
      body.append('token', this.Constant['API_TOKEN']);

	    let options = this.commonservice.generateRequestHeaders();
	    this.commonservice.SubmiPostFormData('get_task_details',body,options)
	    .then((response) => {          
	      if(response.status == true){
	        this.tasks = response.data;
          
          this.frmEditTask.controls['taskTitle'].setValue(this.tasks.task_title);
          this.frmEditTask.controls['taskDescription'].setValue(this.tasks.task_description);
          this.frmEditTask.controls['taskTimeline'].setValue(this.tasks.task_timeline);
	
	      }  
	    });
  	}
  }

  submitEditTask() { 
    this.spinner.show();

      let body = new FormData();
      body.append('task_title', this.frmEditTask.value.taskTitle);
      body.append('task_timeline', this.frmEditTask.value.taskTimeline);
      body.append('task_description', this.frmEditTask.value.taskDescription);
      body.append('user_id', this.authService.loggedInUserId);
      body.append('task_id', this.task_id);
      body.append('token', this.Constant['API_TOKEN']);

      let options = this.commonservice.generateRequestHeaders();
      this.commonservice.SubmiPostFormData('edit_task',body,options)
      .then((response) => {     
        this.spinner.hide();
        if(response.status == true){
          
          this.toastr.success(response.message);
          this.router.navigate(['/manage-task']);
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
