import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-room-service',
  templateUrl: './add-room-service.component.html',
  styleUrls: ['./add-room-service.component.css']
})
export class AddRoomServiceComponent implements OnInit {

  public Constant : any;
  public frmRoomService: FormGroup;
  public services : any = {data : []};

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 
    this.Constant = this.commonservice.getConstants();
	   //meta tags set
	    var meta_tag = [
	      {name : 'og:title' , content : 'Add Room Service '+' - '+this.Constant['SITE_NM']}
	    ];
	    this.commonservice.changeMetaTagOfPage(meta_tag);
	    this.commonservice.setTitle('Add Room Service');
	    //meta tags set

	     this.frmRoomService = fb.group({
	      'room_title' : ['', [Validators.required]],
	      'room_price' : ['', [Validators.required]]
	    });
  }

  ngOnInit(): void {
    this.loadAllRoomsService();
  }

  public loadAllRoomsService(){

    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('token', this.Constant['API_TOKEN']);

    
    let options = this.commonservice.generateRequestHeaders(false);
    this.commonservice.SubmiPostFormData('get_room_list',body,options)
    .then((response) => {  
      console.log(response.data);        
      if(response.status == true){
        if(response.data.length  > 0){
          this.services.data = response.data;
        }
        else{
          this.services.data = [];
        }
      }  
      else{
        this.services.data = [];
      }  
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  }

  onStatusChange(e:any,id:any) {
    
    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('room_id', id);
    body.append('token', this.Constant['API_TOKEN']);
    
    if (e.target.checked) {
      body.append('status', 'a');
    } else {
      body.append('status', 'd');
    }

    let options = this.commonservice.generateRequestHeaders();
    this.commonservice.SubmiPostFormData('change_room_status',body,options)
    .then((response) => {     
      this.spinner.hide();
      if(response.status == true){
        
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


  }

  submitAddRoomService() { 
    this.spinner.show();
    if(this.frmRoomService.value.taskTitle != '' && this.frmRoomService.value.password != ''){

      let body = new FormData();
      body.append('room_title', this.frmRoomService.value.room_title);
      body.append('room_price', this.frmRoomService.value.room_price);
      body.append('user_id', this.authService.loggedInUserId);
      body.append('token', this.Constant['API_TOKEN']);

      let options = this.commonservice.generateRequestHeaders();
      this.commonservice.SubmiPostFormData('add_room_service',body,options)
      .then((response) => {     
        this.spinner.hide();
        if(response.status == true){
          
          this.toastr.success(response.message);
          this.frmRoomService.reset();
          this.router.navigate(['/add-room-service']);
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
