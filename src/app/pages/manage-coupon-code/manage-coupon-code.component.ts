import { Component, OnInit ,ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-manage-coupon-code',
  templateUrl: './manage-coupon-code.component.html',
  styleUrls: ['./manage-coupon-code.component.css']
})
export class ManageCouponCodeComponent implements OnInit {

  public Constant : any;
  public editId : any;
  public frmCouponCode: FormGroup;

  public couponcode: any = {data : []};
  public coupons: any;
  @ViewChild('closeCouponCodeModal') closeCouponCodeModal: ElementRef;


  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService, public authService:AuthService) { 

    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Manage Coupon Code '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Manage Coupon Code');
    //meta tags set
    this.frmCouponCode = fb.group({
       'couponcode' : ['', [Validators.required]],
       'discount' : ['', [Validators.required]] ,
       'couponcodeId' : ['', [Validators.required]] 
     });

  }

  ngOnInit(): void {
    this.loadAllCouponCode();
  }

  public loadAllCouponCode(){

    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('token', this.Constant['API_TOKEN']);

    
    let options = this.commonservice.generateRequestHeaders(false);
    this.commonservice.SubmiPostFormData('get_coupon_code_list',body,options)
    .then((response) => {  
      //console.log(response.data);        
      if(response.status == true){
        if(response.data.length  > 0){
          this.couponcode.data = response.data;
        }
        else{
          this.couponcode.data = [];
        }
      }  
      else{
        this.couponcode.data = [];
      }  
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  }

  public deleteCouponCode(id : string = ''){

    let exeFn = (result:any)=>{
      if(result.value){
        
        let body = new FormData();
        body.append('coupon_code_id', id);
        body.append('user_id', this.authService.loggedInUserId);
        body.append('token', this.Constant['API_TOKEN']);
    
        let options = this.commonservice.generateRequestHeaders(false);
        this.commonservice.SubmiPostFormData('delete_coupon_code',body,options)
        .then((response) => {          
          if(response.status == true){
            this.toastr.success(response.message);
            this.loadAllCouponCode();
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
    this.commonservice.showConfirmDialog('Delete','Are you sure you want to delete this coupon code','Yes','No',exeFn);
  }

  public editCouponCode(id : string = '') {
   let coupon_code_id = id ;
   if(this.authService.isLoggedIn){
      let body = new FormData();
      body.append('user_id', this.authService.loggedInUserId);
        body.append('coupon_code_id', coupon_code_id);
        body.append('token', this.Constant['API_TOKEN']);

      let options = this.commonservice.generateRequestHeaders();
      this.commonservice.SubmiPostFormData('get_coupon_code_details',body,options)
      .then((response) => {          
        if(response.status == true){
          this.coupons = response.data[0];
            //console.log(this.coupons) ;
            this.frmCouponCode.controls['couponcode'].setValue(this.coupons.coupon_code);
            this.frmCouponCode.controls['discount'].setValue(this.coupons.discount);
            this.frmCouponCode.controls['couponcodeId'].setValue(this.coupons.coupon_code_id);
          }  
      });
    } 
  }

  submitCouponCode() { 
      this.spinner.show();
      let body = new FormData();
      body.append('coupon_code', this.frmCouponCode.value.couponcode);
      body.append('discount', this.frmCouponCode.value.discount);
      body.append('user_id', this.authService.loggedInUserId);
      body.append('coupon_code_id', this.frmCouponCode.value.couponcodeId);
      body.append('token', this.Constant['API_TOKEN']);

      let options = this.commonservice.generateRequestHeaders();
      this.commonservice.SubmiPostFormData('edit_coupon_code',body,options)
      .then((response) => {     
        this.spinner.hide();
        if(response.status == true){
          
          this.toastr.success(response.message);
          this.closeCouponCodeModal.nativeElement.click();
          this.loadAllCouponCode() ;
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
