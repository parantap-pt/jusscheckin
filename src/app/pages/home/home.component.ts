import { Component, OnInit ,ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public Constant : any;
  public bannerData: any = {data : []};

   constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService, public authService:AuthService) { 

    this.Constant = this.commonservice.getConstants();
    console.log(this.Constant['API_END_POINT']);
    //meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Home'}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Home');
    //meta tags set

  }

  ngOnInit(): void {
    this.loadBanner() ;
  }

  public loadBanner(){

    let body = new FormData();
    body.append('token', this.Constant['API_TOKEN']);
    let options = this.commonservice.generateRequestHeaders(false);
    this.commonservice.SubmiPostFormData('get_homepage_banner',body,options)
    .then((response) => {  
      //console.log(response.data[0]);        
      if(response.status == true){
        if(response.data.length  > 0){
          this.bannerData.data = response.data[0];
        }
        else{
          this.bannerData.data = [];
        }
      }  
      else{
        this.bannerData.data = [];
      }  
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  }
}
