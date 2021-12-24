import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { customValidations } from '../../validators/custom-validator';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  public Constant : any;
  public frmAddDepartment: FormGroup;
  
  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 

    this.Constant = this.commonservice.getConstants();
	  //meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Create Department '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Create Department');
    //meta tags set

    this.frmAddDepartment = fb.group({
      'name' : ['', [Validators.required]],
      'description' : ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  submitAddDepartment() { 
    this.spinner.show();
    if(this.frmAddDepartment.value.taskTitle != '' && this.frmAddDepartment.value.password != ''){

      let body = new FormData();
      body.append('name', this.frmAddDepartment.value.name);
      body.append('description', this.frmAddDepartment.value.description);
      body.append('user_id', this.authService.loggedInUserId);
      body.append('token', this.Constant['API_TOKEN']);

      let options = this.commonservice.generateRequestHeaders();
      this.commonservice.SubmiPostFormData('add_department',body,options)
      .then((response) => {     
        this.spinner.hide();
        if(response.status == true){
          
          this.frmAddDepartment.reset();
          this.toastr.success(response.message);
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
