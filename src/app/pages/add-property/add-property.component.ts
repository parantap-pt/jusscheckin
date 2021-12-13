import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { customValidations } from '../../validators/custom-validator';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  public Constant : any;
  public file : any;
  public imageSrc: string;
  public frmProperty: FormGroup;

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 

    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Add Property '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Add Property');
    //meta tags set

    this.frmProperty = fb.group({
      'propertyName' : ['', [Validators.required]],
      'propertyType' : ['', [Validators.required]],
      'address' : ['', [Validators.required]],
      'totalRoom' : ['', [Validators.required]],
      'image' : ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
  }

  onFileChange(event:any) {

    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {

      const [file] = event.target.files;

      this.file = event.target.files;

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.frmProperty.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

  submitProperty(){
    console.log(this.frmProperty.value.image);
    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('property_name', this.frmProperty.value.propertyName);
    body.append('property_type', this.frmProperty.value.propertyType);
    body.append('location', this.frmProperty.value.address);
    body.append('total_room', this.frmProperty.value.totalRoom);
    body.append('guest_facility_id', '1');
    body.append('image', this.file[0]);
    body.append('token', this.Constant['API_TOKEN']);

    let options = this.commonservice.generateRequestHeaders();
    this.commonservice.SubmiPostFormData('add_property',body,options)
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

}
