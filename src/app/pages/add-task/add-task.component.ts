import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { customValidations } from '../../validators/custom-validator';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

   public Constant : any;
   public frmAddTask: FormGroup;
   public csValid = new customValidations();

   constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 
   	  
   	   this.Constant = this.commonservice.getConstants();
	   //meta tags set
	    var meta_tag = [
	      {name : 'og:title' , content : 'Add Task '+' - '+this.Constant['SITE_NM']}
	    ];
	    this.commonservice.changeMetaTagOfPage(meta_tag);
	    this.commonservice.setTitle('Add Task');
	    //meta tags set

	     this.frmAddTask = fb.group({
	      'taskTitle' : ['', [Validators.required]],
	      'taskTimeline' : ['', [Validators.required]],
	      'taskDescription' : ['', [Validators.required]]
	    });
   }

  ngOnInit(): void {
  	console.log(this.authService.loggedInUserId) ;
  	console.log(this.authService.loggedInUserData) ;
  }

  submitAddTask() { 
    this.spinner.show();
    if(this.frmAddTask.value.taskTitle != '' && this.frmAddTask.value.password != ''){

      let body = new FormData();
      body.append('task_title', this.frmAddTask.value.taskTitle);
      body.append('task_timeline', this.frmAddTask.value.taskTimeline);
      body.append('task_description', this.frmAddTask.value.taskDescription);
      body.append('user_id', this.authService.loggedInUserId);
      body.append('token', this.Constant['API_TOKEN']);

      let options = this.commonservice.generateRequestHeaders();
      this.commonservice.SubmiPostFormData('add_task',body,options)
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
    }else{
        this.toastr.error('Please enter required fields');
    }
  }
}
