import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  public Constant : any;

  public rooms: any = {data : []};

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService, public authService:AuthService) { 
    
    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Room List '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Room List');
    //meta tags set

  }

  ngOnInit(): void {
    this.loadAllRooms();
  }

  public loadAllRooms(){

    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('property_id','22');
    body.append('token', this.Constant['API_TOKEN']);

    
    let options = this.commonservice.generateRequestHeaders(false);
    this.commonservice.SubmiPostFormData('get_rooms_lists',body,options)
    .then((response) => {  
      //console.log(response.data);        
      if(response.status == true){
        if(response.data.length  > 0){
          this.rooms.data = response.data;
        }
        else{
          this.rooms.data = [];
        }
      }  
      else{
        this.rooms.data = [];
      }  
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  }
  
  public deleteRoom(id : string = ''){

    let exeFn = (result:any)=>{
      if(result.value){
        
        let body = new FormData();
        body.append('room_id', id);
        body.append('user_id', this.authService.loggedInUserId);
        body.append('token', this.Constant['API_TOKEN']);
    
        let options = this.commonservice.generateRequestHeaders(false);
        this.commonservice.SubmiPostFormData('delete_room',body,options)
        .then((response) => {          
          if(response.status == true){
            this.toastr.success(response.message);
            this.loadAllRooms();
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
    this.commonservice.showConfirmDialog('Delete','Are you sure you want to delete this room','Yes','No',exeFn);
  }

}
