import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-checkout-guest-details',
  templateUrl: './checkout-guest-details.component.html',
  styleUrls: ['./checkout-guest-details.component.css']
})
export class CheckoutGuestDetailsComponent implements OnInit {

  public Constant : any;
  public guestData : any;
  
  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 
    
    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Checkout '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Checkout');
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
    this.commonservice.SubmiPostFormData('get_check_out_guest_details',body,options)
    .then((response) => {  
      console.log(response.data);        
      if(response.status == true){
        if(response.data.length  > 0){
          this.guestData = response.data;
        }
        else{
          this.guestData = [];
        }
      }  
      else{
        this.guestData = [];
      }  
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  }

}

