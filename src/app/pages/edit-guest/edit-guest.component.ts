import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-guest',
  templateUrl: './edit-guest.component.html',
  styleUrls: ['./edit-guest.component.css']
})
export class EditGuestComponent implements OnInit {

  public Constant : any;
  public file : any;
  public guest : any;
  public imageSrc: string;
  public frmGuest: FormGroup;
  public guest_id: any;

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 
    this.Constant = this.commonservice.getConstants();
    //meta tags set
     var meta_tag = [
       {name : 'og:title' , content : 'Edit Guest '+' - '+this.Constant['SITE_NM']}
     ];
     this.commonservice.changeMetaTagOfPage(meta_tag);
     this.commonservice.setTitle('Edit Guest');
     //meta tags set

      this.frmGuest = fb.group({
        'title' : ['', [Validators.required]],
        'description' : ['', [Validators.required]],
        'image' : ['']
      });

     this.guest_id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    
    if(this.authService.isLoggedIn){
  		let body = new FormData();
	    body.append('user_id', this.guest_id);
      body.append('token', this.Constant['API_TOKEN']);

	    let options = this.commonservice.generateRequestHeaders();
	    this.commonservice.SubmiPostFormData('get_guest_facility',body,options)
	    .then((response) => {          
	      if(response.status == true){
	        this.guest = response.data[0];
          
          this.frmGuest.controls['title'].setValue(this.guest.title);
          this.frmGuest.controls['description'].setValue(this.guest.description);

          this.imageSrc = this.guest.image;
	
	      }  
	    });
  	}

  }

  submitGuest(){
    console.log(this.frmGuest.value.image);
    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('guest_facility_id', this.guest.id);
    body.append('title', this.frmGuest.value.title);
    body.append('description', this.frmGuest.value.description);
    if(this.file){
      body.append('image', this.file[0]);
    }
    body.append('token', this.Constant['API_TOKEN']);

    let options = this.commonservice.generateRequestHeaders();
    this.commonservice.SubmiPostFormData('edit_guest_facility',body,options)
    .then((response) => {     
      this.spinner.hide();
      if(response.status == true){
        
        this.toastr.success(response.message);
        this.router.navigate(['/manage-guest']);
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

  onFileChange(event:any) {

    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {

      const [file] = event.target.files;

      this.file = event.target.files;

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.frmGuest.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

}
