import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators,FormArray} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {

  public Constant : any;
  public department : any;
  public role : any;
  public property : any;
  public frmBooking: FormGroup;
  
  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 

    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Add Booking '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Add Booking');
    //meta tags set

    this.frmBooking = fb.group({
      'property_id' : ['', [Validators.required]],
      'total_room' : ['', [Validators.required]],
      'room_no' : ['', [Validators.required]],
      'adult_guest' : ['', [Validators.required]],
      'children' : ['', [Validators.required]],
      'from_date' : ['', [Validators.required]],
      'to_date' : ['', [Validators.required]],
      'members': this.fb.array([]) ,  
    });

  }

  ngOnInit(): void {
    this.loadProperty();
  }

  newMember(): FormGroup {  
    return this.fb.group({  
      guest_name: '',  
      age: '',  
    })  
  }  
  
  members() : FormArray {  
    return this.frmBooking.get("members") as FormArray  
  }  

  addMember() {  
    this.members().push(this.newMember());  
  }  
     
  removeQuantity(i:number) {  
    this.members().removeAt(i);  
  }  

  public loadProperty(){
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

  submitEmployee(){
    //console.log(this.frmBooking.value);
    if(this.frmBooking.value.members.length > 0){
        let body = new FormData();
        body.append('user_id', this.authService.loggedInUserId);
        body.append('property_id', this.frmBooking.value.property_id);
        body.append('total_room', this.frmBooking.value.total_room);
        body.append('room_no', this.frmBooking.value.room_no);
        body.append('adult_guest', this.frmBooking.value.adult_guest);
        body.append('children', this.frmBooking.value.children);
        body.append('from_date', this.frmBooking.value.from_date);
        body.append('to_date', this.frmBooking.value.to_date);
        body.append('members', JSON.stringify(this.frmBooking.value.members));
        body.append('token', this.Constant['API_TOKEN']);

        let options = this.commonservice.generateRequestHeaders();
        this.commonservice.SubmiPostFormData('add_booking',body,options)
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
