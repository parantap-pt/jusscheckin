import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-coupon-code',
  templateUrl: './edit-coupon-code.component.html',
  styleUrls: ['./edit-coupon-code.component.css']
})
export class EditCouponCodeComponent implements OnInit {
  public Constant : any;
  public frmCouponCode: FormGroup;
  public coupons: any;
  public coupon_code_id: any;

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 
    this.Constant = this.commonservice.getConstants();
    //meta tags set
     var meta_tag = [
       {name : 'og:title' , content : 'Edit Coupon Code '+' - '+this.Constant['SITE_NM']}
     ];
     this.commonservice.changeMetaTagOfPage(meta_tag);
     this.commonservice.setTitle('Edit Coupon Code');
     //meta tags set

      this.frmCouponCode = fb.group({
       'couponcode' : ['', [Validators.required]],
       'discount' : ['', [Validators.required]] 
     });
     this.coupon_code_id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
   /* if(this.authService.isLoggedIn){
  		let body = new FormData();
	    body.append('user_id', this.authService.loggedInUserId);
        body.append('coupon_code_id', this.coupon_code_id);
        body.append('token', this.Constant['API_TOKEN']);

	    let options = this.commonservice.generateRequestHeaders();
	    this.commonservice.SubmiPostFormData('get_coupon_code_details',body,options)
	    .then((response) => {          
	      if(response.status == true){
		      this.coupons = response.data;
	          console.log(this.coupons) ;
	          this.frmCouponCode.controls['coupon_code'].setValue(this.coupons.couponcode);
	          this.frmCouponCode.controls['discount'].setValue(this.coupons.discount);
          }  
	    });
  	} */
  }

  submitCouponCode() { 
    this.spinner.show();

      let body = new FormData();
      body.append('coupon_code', this.frmCouponCode.value.couponcode);
      body.append('discount', this.frmCouponCode.value.discount);
      body.append('user_id', this.authService.loggedInUserId);
      body.append('coupon_code_id', this.coupon_code_id);
      body.append('token', this.Constant['API_TOKEN']);

      let options = this.commonservice.generateRequestHeaders();
      this.commonservice.SubmiPostFormData('edit_coupon_code',body,options)
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
