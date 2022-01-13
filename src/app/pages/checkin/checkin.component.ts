import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators,FormArray} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  public Constant : any;
  public frmBooking: FormGroup;

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 

  this.Constant = this.commonservice.getConstants();

  //meta tags set
  var meta_tag = [
    {name : 'og:title' , content : 'Check In'}
  ];
  this.commonservice.changeMetaTagOfPage(meta_tag);
  this.commonservice.setTitle('Check In');
  //meta tags set

  this.frmBooking = fb.group({
    'room_no' : ['', [Validators.required]],
    'check_out_date' : ['', [Validators.required]],
    'members': this.fb.array([]) ,  
  });

  }

  ngOnInit(): void {
  }

  newMember(): FormGroup {  
    return this.fb.group({  
      guest_name: '',  
      guest_id_proof: '',  
    })  
  }

  members() : FormArray {  
    return this.frmBooking.get("members") as FormArray  
  }  

  addMember() {  
    this.members().push(this.newMember());  
  }

  submitCheckin(){
    //console.log(this.frmBooking.value);
    if(this.frmBooking.value.members.length > 0){
        let body = new FormData();
        body.append('user_id', this.authService.loggedInUserId);
        body.append('property_id', this.frmBooking.value.property_id);
        body.append('total_room', this.frmBooking.value.total_room);
        body.append('room_number', this.frmBooking.value.room_no);
        body.append('adult_guest', this.frmBooking.value.adult_guest);
        body.append('children', this.frmBooking.value.children);
        body.append('from_date', this.frmBooking.value.from_date);
        body.append('to_date', this.frmBooking.value.to_date);
        body.append('members', JSON.stringify(this.frmBooking.value.members));
        body.append('token', this.Constant['API_TOKEN']);

        let options = this.commonservice.generateRequestHeaders();
        this.commonservice.SubmiPostFormData('check_in',body,options)
        .then((response) => {     
          this.spinner.hide();
          if(response.status == true){
            
            this.toastr.success(response.message);
            this.frmBooking.reset();
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
        this.toastr.error('Please add Guest user Data');
        return false;
    }
    
  }

}
