import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.css']
})
export class ManageTaskComponent implements OnInit {

  public Constant : any;

  public tasks: any = {data : []};

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService, public authService:AuthService) { 

    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Manage Tasks '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Manage Tasks');
    //meta tags set

  }

  ngOnInit(): void {
    this.loadAllTasks();
  }

  public loadAllTasks(){

    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('token', this.Constant['API_TOKEN']);

    
    let options = this.commonservice.generateRequestHeaders(false);
    this.commonservice.SubmiPostFormData('get_task_list',body,options)
    .then((response) => {  
      //console.log(response.data);        
      if(response.status == true){
        if(response.data.length  > 0){
          this.tasks.data = response.data;
        }
        else{
          this.tasks.data = [];
        }
      }  
      else{
        this.tasks.data = [];
      }  
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  }

  public deleteTasks(id : string = ''){

    let exeFn = (result:any)=>{
      if(result.value){
        
        let body = new FormData();
        body.append('task_id', id);
        body.append('user_id', '1');
        body.append('token', this.Constant['API_TOKEN']);
    
        let options = this.commonservice.generateRequestHeaders(false);
        this.commonservice.SubmiPostFormData('delete_task',body,options)
        .then((response) => {          
          if(response.status == true){
            this.toastr.success(response.message);
            this.loadAllTasks();
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
    this.commonservice.showConfirmDialog('Delete','Are you sure you want to delete this task','Yes','No',exeFn);
  }

}
