import { Component, OnInit ,ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-manage-agency',
  templateUrl: './manage-agency.component.html',
  styleUrls: ['./manage-agency.component.css']
})
export class ManageAgencyComponent implements OnInit {

  public Constant : any;
  public frmAgencyName: FormGroup;
  public agencyNames: any = {data : []};
  public agency: any;


  @ViewChild('closeAgencyNameModal') closeAgencyNameModal: ElementRef;


  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService, public authService:AuthService) { 

    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Manage Coupon Code '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Manage Coupon Code');
    //meta tags set
    this.frmAgencyName = fb.group({
       'agencyName' : ['', [Validators.required]],
       'agencyId' : ['', [Validators.required]]
     });

  }

  ngOnInit(): void {
    this.loadAllAgencyName();
  }

  public loadAllAgencyName(){

    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('token', this.Constant['API_TOKEN']);

    let options = this.commonservice.generateRequestHeaders(false);
    this.commonservice.SubmiPostFormData('get_agency_list',body,options)
    .then((response) => {  
      //console.log(response.data);        
      if(response.status == true){
        if(response.data.length  > 0){
          this.agencyNames.data = response.data;
        }
        else{
          this.agencyNames.data = [];
        }
      }  
      else{
        this.agencyNames.data = [];
      }  
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  }

  public deleteAgencyName(id : string = ''){

    let exeFn = (result:any)=>{
      if(result.value){
        
        let body = new FormData();
        body.append('agency_id', id);
        body.append('user_id', this.authService.loggedInUserId);
        body.append('token', this.Constant['API_TOKEN']);
    
        let options = this.commonservice.generateRequestHeaders(false);
        this.commonservice.SubmiPostFormData('delete_agency',body,options)
        .then((response) => {          
          if(response.status == true){
            this.toastr.success(response.message);
            this.loadAllAgencyName();
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
    this.commonservice.showConfirmDialog('Delete','Are you sure you want to delete this Agency name','Yes','No',exeFn);
  }

  public editAgencyName(id : string = '') {
	   let agency_id = id ;
	   if(this.authService.isLoggedIn){
	      let body = new FormData();
	      body.append('user_id', this.authService.loggedInUserId);
	        body.append('agency_id', agency_id);
	        body.append('token', this.Constant['API_TOKEN']);

	      let options = this.commonservice.generateRequestHeaders();
	      this.commonservice.SubmiPostFormData('get_agency_details',body,options)
	      .then((response) => {          
	        if(response.status == true){
	          this.agency = response.data[0];
	            //console.log(this.agency) ;
	            this.frmAgencyName.controls['agencyName'].setValue(this.agency.name);
	            this.frmAgencyName.controls['agencyId'].setValue(this.agency.agency_id);
	          }  
	      });
	    } 
  }

  submitAgencyName() { 
      this.spinner.show();
      let body = new FormData();
      body.append('token', this.Constant['API_TOKEN']);
      body.append('user_id', this.authService.loggedInUserId);
      body.append('agency_id', this.frmAgencyName.value.agencyId);
      body.append('name', this.frmAgencyName.value.agencyName);

      let options = this.commonservice.generateRequestHeaders();
      this.commonservice.SubmiPostFormData('edit_agency',body,options)
      .then((response) => {     
        this.spinner.hide();
        if(response.status == true){
          
          this.toastr.success(response.message);
          this.closeAgencyNameModal.nativeElement.click();
          this.loadAllAgencyName() ;
          this.router.navigate(['/manage-agency']);
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
