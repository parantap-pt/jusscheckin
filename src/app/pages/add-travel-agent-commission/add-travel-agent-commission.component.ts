import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-travel-agent-commission',
  templateUrl: './add-travel-agent-commission.component.html',
  styleUrls: ['./add-travel-agent-commission.component.css']
})
export class AddTravelAgentCommissionComponent implements OnInit {

   public Constant : any;
   public frmAgentCommission: FormGroup;
   public agentData: any = {data : []};

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService,public authService:AuthService) { 

    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Add Travel Agent Commission'+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Add Travel Agent Commission');
    //meta tags set

    this.frmAgentCommission = fb.group({
      'agentName' : ['', [Validators.required]],
      'agentCommission' : ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
  	this.loadAgentList();
  }

  public loadAgentList(){
	    let body = new FormData();
	    body.append('user_id', this.authService.loggedInUserId);
	    body.append('token', this.Constant['API_TOKEN']);
	    let options = this.commonservice.generateRequestHeaders(false);
	    this.commonservice.SubmiPostFormData('get_travel_agent_list',body,options)
	    .then((response) => {  
	      console.log(response.data);        
	      if(response.status == true){
	        if(response.data.length  > 0){
	          this.agentData.data = response.data;
	        }
	        else{
	          this.agentData.data = [];
	        }
	      }  
	      else{
	        this.agentData.data = [];
	      }  
	    })
	    .catch((error) => {
	      console.log(error);
	      return false;
	    });
  }
	  
  submitAgentCommission(){
    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('agent_id', this.frmAgentCommission.value.agentName);
    body.append('commission_per', this.frmAgentCommission.value.agentCommission);
    body.append('token', this.Constant['API_TOKEN']);

    let options = this.commonservice.generateRequestHeaders();
    this.commonservice.SubmiPostFormData('add_travel_agent_commission',body,options)
    .then((response) => {     
      this.spinner.hide();
      if(response.status == true){
        
        this.toastr.success(response.message);
        this.router.navigate(['/manage-travel-agent-commission']);
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
