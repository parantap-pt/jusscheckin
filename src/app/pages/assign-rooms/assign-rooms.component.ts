import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-assign-rooms',
  templateUrl: './assign-rooms.component.html',
  styleUrls: ['./assign-rooms.component.css']
})
export class AssignRoomsComponent implements OnInit {

  public Constant : any;
  public rooms : any;
  
  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 
    
    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Assign Rooms '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Assign Rooms');
    //meta tags set
  }

  ngOnInit(): void {
    this.loadTask();
  }

  public loadTask(){

    let body = new FormData();
    body.append('hotel_id', '1');
    body.append('token', this.Constant['API_TOKEN']);

    
    let options = this.commonservice.generateRequestHeaders(false);
    this.commonservice.SubmiPostFormData('get_assigned_room_list',body,options)
    .then((response) => {  
      console.log(response.data);        
      if(response.status == true){
        if(response.data.length  > 0){
          this.rooms = response.data;
        }
        else{
          this.rooms = [];
        }
      }  
      else{
        this.rooms = [];
      }  
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  }

}

