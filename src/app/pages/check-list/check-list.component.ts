import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class CheckListComponent implements OnInit {

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
    this.commonservice.SubmiPostFormData('get_check_list_details',body,options)
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

	downloadMyFile(filename:any){
	    const link = document.createElement('a');
	    //link.setAttribute('target', '_blank');
	    link.setAttribute('href', filename);
	    link.setAttribute('download', `products.jpg`);
	    document.body.appendChild(link);
	    link.click();
	    link.remove();
	}
}

