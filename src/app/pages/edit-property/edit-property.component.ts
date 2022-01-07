import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { customValidations } from '../../validators/custom-validator';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {

  public Constant : any;
  public file : any;
  public idfile : any;
  public imageSrc: string;
  public IdImageSrc: string;
  public frmEditProperty: FormGroup;
  public propertyType: any = {data : []};
  public property: any;
  public property_id: any;

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 

    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Edit Property '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Edit Property');
    //meta tags set

    this.frmEditProperty = fb.group({
      'propertyName' : ['', [Validators.required]],
      'propertyType' : ['', [Validators.required]],
      'address' : ['', [Validators.required]],
      'totalRoom' : ['', [Validators.required]],
      'image' : [''],
      'upload_id' : ['']
    });

    this.property_id = this.activatedRoute.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.loadPropertyType();

    if(this.authService.isLoggedIn){  
      let body = new FormData();
      body.append('user_id', this.authService.loggedInUserId);
      body.append('property_id', this.property_id);
      body.append('token', this.Constant['API_TOKEN']);

      let options = this.commonservice.generateRequestHeaders();
      this.commonservice.SubmiPostFormData('get_property_details',body,options)
      .then((response) => {          
        if(response.status == true){
          this.property = response.data[0];
          //console.log(this.property) ;
          this.frmEditProperty.controls['propertyName'].setValue(this.property.property_name);
          this.frmEditProperty.controls['propertyType'].setValue(this.property.property_type_id);
          this.frmEditProperty.controls['address'].setValue(this.property.location);
          this.frmEditProperty.controls['totalRoom'].setValue(this.property.total_room);
          this.imageSrc = this.property.image;
          this.IdImageSrc = this.property.upload_id;
  
        }  
      });
    }
  }

  onFileChange(event:any) {

    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {

      const [file] = event.target.files;

      this.file = event.target.files;

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.frmEditProperty.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

  onIdFileChange(event:any) {

    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {

      const [file] = event.target.files;

      this.idfile = event.target.files;

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.IdImageSrc = reader.result as string;
        this.frmEditProperty.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

  submitEditProperty(){
    console.log(this.frmEditProperty.value.image);
    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('property_id', this.property_id);
    body.append('property_name', this.frmEditProperty.value.propertyName);
    body.append('property_type', this.frmEditProperty.value.propertyType);
    body.append('location', this.frmEditProperty.value.address);
    body.append('total_room', this.frmEditProperty.value.totalRoom);
    body.append('guest_facility_id', '1');
    if(this.file){
      body.append('image', this.file[0]);
    }
    if(this.idfile){
      body.append('upload_id', this.idfile[0]);
    }
    body.append('token', this.Constant['API_TOKEN']);

    let options = this.commonservice.generateRequestHeaders();
    this.commonservice.SubmiPostFormData('edit_property',body,options)
    .then((response) => {     
      this.spinner.hide();
      if(response.status == true){
        
        this.toastr.success(response.message);
        this.router.navigate(['/manage-property']);
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

  public loadPropertyType(){

    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('token', this.Constant['API_TOKEN']);

    
    let options = this.commonservice.generateRequestHeaders(false);
    this.commonservice.SubmiPostFormData('get_property_type',body,options)
    .then((response) => {  
      console.log(response.data);        
      if(response.status == true){
        if(response.data.length  > 0){
          this.propertyType.data = response.data;
        }
        else{
          this.propertyType.data = [];
        }
      }  
      else{
        this.propertyType.data = [];
      }  
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  }

}
