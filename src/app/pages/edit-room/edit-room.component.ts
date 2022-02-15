import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {

  public Constant : any;
  public frmRooms: FormGroup;
  public rooms: any;
  public room_id: any;
  public property: any;

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 

    this.Constant = this.commonservice.getConstants();
    //meta tags set
     var meta_tag = [
       {name : 'og:title' , content : 'Edit Rooms '+' - '+this.Constant['SITE_NM']}
     ];
     this.commonservice.changeMetaTagOfPage(meta_tag);
     this.commonservice.setTitle('Edit Rooms');
     //meta tags set

      this.frmRooms = fb.group({
        'property_id' : ['', [Validators.required]],
        'room_type' : ['', [Validators.required]],
        'room_number' : ['', [Validators.required]],
        'room_price' : ['', [Validators.required]]
     });
     this.room_id = this.activatedRoute.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {

    this.loadAllProperty();
    
    if(this.authService.isLoggedIn){
  		let body = new FormData();
	    body.append('user_id', this.authService.loggedInUserId);
        body.append('room_id', this.room_id);
        body.append('token', this.Constant['API_TOKEN']);

	    let options = this.commonservice.generateRequestHeaders();
	    this.commonservice.SubmiPostFormData('edit_rooms_lists',body,options)
	    .then((response) => {          
	      if(response.status == true){
		      this.rooms = response.data[0];
          this.frmRooms.controls['property_id'].setValue(this.rooms.property_id);
          this.frmRooms.controls['room_type'].setValue(this.rooms.room_type);
          this.frmRooms.controls['room_price'].setValue(this.rooms.room_price);
          this.frmRooms.controls['room_number'].setValue(this.rooms.room_no);
          }  
	    });
  	}

  }

  public loadAllProperty(){

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

  submitEditRoom() { 
    this.spinner.show();
    
    let body = new FormData();
    body.append('property_id', this.frmRooms.value.property_id);
    body.append('room_id', this.room_id);
    body.append('room_type', this.frmRooms.value.room_type);
    body.append('room_number', this.frmRooms.value.room_number);
    body.append('room_price', this.frmRooms.value.room_price);
    body.append('user_id', this.authService.loggedInUserId);
    body.append('token', this.Constant['API_TOKEN']);

    let options = this.commonservice.generateRequestHeaders();
    this.commonservice.SubmiPostFormData('update_room',body,options)
    .then((response) => {     
      this.spinner.hide();
      if(response.status == true){
        
        this.toastr.success(response.message);
        this.router.navigate(['/room-list']);
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
