import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard-reception',
  templateUrl: './dashboard-reception.component.html',
  styleUrls: ['./dashboard-reception.component.css']
})
export class DashboardReceptionComponent implements OnInit {

  public Constant : any;

  public booking: any = {data : []};

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService, public authService:AuthService) { 
    
    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Dashboard'}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Dashboard');
    //meta tags set
  }

  ngOnInit(): void {
    this.loadAllBooking();
  }

  public loadAllBooking(){

    let body = new FormData();
    body.append('hotel_id', '1');
    body.append('token', this.Constant['API_TOKEN']);

    
    let options = this.commonservice.generateRequestHeaders(false);
    this.commonservice.SubmiPostFormData('get_booking_details',body,options)
    .then((response) => {  
      //console.log(response.data);        
      if(response.status == true){
        if(response.data.length  > 0){
          this.booking.data = response.data;
        }
        else{
          this.booking.data = [];
        }
      }  
      else{
        this.booking.data = [];
      }  
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  }

}
