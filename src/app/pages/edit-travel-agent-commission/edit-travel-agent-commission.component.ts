import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-travel-agent-commission',
  templateUrl: './edit-travel-agent-commission.component.html',
  styleUrls: ['./edit-travel-agent-commission.component.css']
})
export class EditTravelAgentCommissionComponent implements OnInit {

  public Constant : any;
   public frmAgentCommission: FormGroup;
   public agentData: any = {data : []};
   public agencyData: any = {data : []};
   public selectedAgency  = '' ;
   public selectedAgent  = '' ;
   public commission_id: any;
   public commission: any;

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
      'agencyName' : ['', [Validators.required]],
      'agentCommission' : ['', [Validators.required]]
    });
    this.commission_id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
   if(this.authService.isLoggedIn){
  	  let body = new FormData();
	  body.append('user_id', this.authService.loggedInUserId);
      body.append('commission_id', this.commission_id);
      body.append('token', this.Constant['API_TOKEN']);

	    let options = this.commonservice.generateRequestHeaders();
	    this.commonservice.SubmiPostFormData('get_agent_commission_details',body,options)
	    .then((response) => {          
	      if(response.status == true){
	         this.commission = response.data[0];
          	 //console.log(this.commission) ;
	          this.frmAgentCommission.controls['agencyName'].setValue(this.commission.agency_id);
	          this.frmAgentCommission.controls['agentName'].setValue(this.commission.agent_id);
	          this.frmAgentCommission.controls['agentCommission'].setValue(this.commission.commission_per);
	
	      }  
	    });
  	}
    this.loadAgncytList();
  }

  public loadAgncytList(){
      let body = new FormData();
      body.append('user_id', this.authService.loggedInUserId);
      body.append('token', this.Constant['API_TOKEN']);
      let options = this.commonservice.generateRequestHeaders(false);
      this.commonservice.SubmiPostFormData('get_agency_list',body,options)
      .then((response) => {  
        console.log(response.data);        
        if(response.status == true){
          if(response.data.length  > 0){
            this.agencyData.data = response.data;
          }
          else{
            this.agencyData.data = [];
          }
        }  
        else{
          this.agencyData.data = [];
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
    body.append('agency_id', this.frmAgentCommission.value.agencyName);
    body.append('commission_per', this.frmAgentCommission.value.agentCommission);
    body.append('token', this.Constant['API_TOKEN']);

    let options = this.commonservice.generateRequestHeaders();
    this.commonservice.SubmiPostFormData('add_agent_commission',body,options)
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

  onChange($event:any){
      //this.selectedAgency=$event;
      console.log($event.target.value) ;
  }

   loadAgentList($event:any){
      let agency_id = $event.target.value
      let body = new FormData();
      body.append('user_id', this.authService.loggedInUserId);
      body.append('agency_id', agency_id);
      body.append('token', this.Constant['API_TOKEN']);
      let options = this.commonservice.generateRequestHeaders(false);
      this.commonservice.SubmiPostFormData('get_agent_of_agency',body,options)
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
}
