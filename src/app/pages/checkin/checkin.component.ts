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
  public file :any = [];

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
      guest_name: ''  
    })  
  }

  members() : FormArray {  
    return this.frmBooking.get("members") as FormArray  
  }  

  addMember() {  
    this.members().push(this.newMember());  
  }

  onFileChange(event:any) {

    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {

      this.file.push(event.target.files[0]);
    }
  }

  submitCheckin(){
    console.log(this.frmBooking.value.members.concat(this.file));
    
    if(this.frmBooking.value.members.length > 0){
        let body = new FormData();
        body.append('hotel_id', '1');
        body.append('room_no', this.frmBooking.value.room_no);
        body.append('check_out_date', this.frmBooking.value.check_out_date);
        body.append('name', JSON.stringify(this.frmBooking.value.members));
        body.append('id_proof', this.file);
        body.append('token', this.Constant['API_TOKEN']);

        let options = this.commonservice.generateRequestHeaders();
        this.commonservice.SubmiPostFormData('check_in',body,options)
        .then((response) => {     
          this.spinner.hide();
          if(response.status == true){
            
            this.toastr.success(response.message);
            this.router.navigate(['/check-list']);
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
