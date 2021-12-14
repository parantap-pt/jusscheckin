import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-travel-agent',
  templateUrl: './add-travel-agent.component.html',
  styleUrls: ['./add-travel-agent.component.css']
})
export class AddTravelAgentComponent implements OnInit {

  public Constant : any;
  public file : any;
  public imageSrc: string;
  public frmAgent: FormGroup;

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 

    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Login '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Add Guest Facilities');
    //meta tags set

    this.frmAgent = fb.group({
      'agent_name' : ['', [Validators.required]],
      'agency_name' : ['', [Validators.required]],
      'travel_name' : ['', [Validators.required]],
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
        this.frmAgent.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

  submitGuest(){
    console.log(this.frmAgent.value.image);
    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('agent_name', this.frmAgent.value.agent_name);
    body.append('agency_name', this.frmAgent.value.agency_name);
    body.append('travel_name', this.frmAgent.value.travel_name);
    body.append('image', this.file[0]);
    body.append('token', this.Constant['API_TOKEN']);

    let options = this.commonservice.generateRequestHeaders();
    this.commonservice.SubmiPostFormData('add_travel_agent',body,options)
    .then((response) => {     
      this.spinner.hide();
      if(response.status == true){
        
        this.toastr.success(response.message);
        this.router.navigate(['/manage-travel-agent']);
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
