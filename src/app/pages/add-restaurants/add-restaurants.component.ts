import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-restaurants',
  templateUrl: './add-restaurants.component.html',
  styleUrls: ['./add-restaurants.component.css']
})
export class AddRestaurantsComponent implements OnInit {

  public Constant : any;
  public file : any;
  public imageSrc: string;
  public frmRestaurants: FormGroup;

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 
    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Login '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Add Restaurants');
    //meta tags set

    this.frmRestaurants = fb.group({
      'name' : ['', [Validators.required]],
      'total_room' : ['', [Validators.required]],
      'total_swimming_pool' : ['', [Validators.required]],
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
        this.frmRestaurants.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

  submitGuest(){
    console.log(this.frmRestaurants.value.image);
    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('name', this.frmRestaurants.value.name);
    body.append('total_room', this.frmRestaurants.value.total_room);
    body.append('total_swimming_pool', this.frmRestaurants.value.total_swimming_pool);
    body.append('image', this.file[0]);
    body.append('token', this.Constant['API_TOKEN']);

    let options = this.commonservice.generateRequestHeaders();
    this.commonservice.SubmiPostFormData('add_restaurant',body,options)
    .then((response) => {     
      this.spinner.hide();
      if(response.status == true){
        
        this.toastr.success(response.message);
        this.frmRestaurants.reset();
        this.imageSrc = '';
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
