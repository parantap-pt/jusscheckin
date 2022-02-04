import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-upcoming-bookings',
  templateUrl: './upcoming-bookings.component.html',
  styleUrls: ['./upcoming-bookings.component.css']
})
export class UpcomingBookingsComponent implements OnInit {

  public Constant : any;
  public property: any;
  public frmProperty: FormGroup;
  public property_data: any = {data : []};
  public frmSearchProperty: FormGroup;
  public start : any;
  public end : any;

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService, public authService:AuthService,private datePipe: DatePipe) { 

    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Upcoming Bookings'}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Upcoming Bookings');
    //meta tags set

    this.frmProperty = fb.group({
      'property_id' : ['', [Validators.required]]
    });

    this.frmSearchProperty = fb.group({
      'booking_id' : [''],
      'guest_name' : [''],
      'start' : [''],
      'end' : ['']
    });

  }

  ngOnInit(): void {
    this.loadAllProperty();
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

  submitProperty(){
    let body = new FormData();
    
    if(this.frmSearchProperty.value.start != '' && this.frmSearchProperty.value.end != ''){
      this.start = this.datePipe.transform(this.frmSearchProperty.value.start,"yyyy-MM-dd");
      this.end = this.datePipe.transform(this.frmSearchProperty.value.end,"yyyy-MM-dd");
      body.append('start_date', this.start);
      body.append('end_date', this.end);
    }

    body.append('property_id', this.frmProperty.value.property_id);
    body.append('booking_id', this.frmSearchProperty.value.booking_id);
    body.append('guest_name', this.frmSearchProperty.value.guest_name);
    body.append('token', this.Constant['API_TOKEN']);

    let options = this.commonservice.generateRequestHeaders();
    this.commonservice.SubmiPostFormData('upcoming_booking_details',body,options)
    .then((response) => {     
      this.spinner.hide();
      if(response.status == true){
        if(response.data.length  > 0){
          console.log(response.data)
          this.property_data.data = response.data;
        }
        else{
          this.property_data.data = [];
        }
      }  
      else{
        this.property_data.data = [];
      }  
    }).catch((error) => {
      console.log(error);
      this.toastr.error('Something went wrong');
      return false;
    });
  }

}
