import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-coupon-code',
  templateUrl: './add-coupon-code.component.html',
  styleUrls: ['./add-coupon-code.component.css']
})
export class AddCouponCodeComponent implements OnInit {

  public Constant : any;
  public file : any;
  public imageSrc: string;
  public frmCouponCode: FormGroup;

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 

    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Add Coupon Code '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Add Coupon Code');
    //meta tags set

    this.frmCouponCode = fb.group({
      'couponcode' : ['', [Validators.required]],
      'discount' : ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
  }

  submitCouponCode(){
    let body = new FormData();
    body.append('token', this.Constant['API_TOKEN']);
    body.append('user_id', this.authService.loggedInUserId);
    body.append('coupon_code', this.frmCouponCode.value.couponcode);
    body.append('discount', this.frmCouponCode.value.discount);

    let options = this.commonservice.generateRequestHeaders();
    this.commonservice.SubmiPostFormData('create_coupon_code',body,options)
    .then((response) => {     
      this.spinner.hide();
      if(response.status == true){
        
        this.toastr.success(response.message);
        this.router.navigate(['/manage-coupon-code']);
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
