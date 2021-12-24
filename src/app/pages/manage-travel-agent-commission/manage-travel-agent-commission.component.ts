import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-manage-travel-agent-commission',
  templateUrl: './manage-travel-agent-commission.component.html',
  styleUrls: ['./manage-travel-agent-commission.component.css']
})
export class ManageTravelAgentCommissionComponent implements OnInit {

   public Constant : any;
   public agentCommission: any = {data : []};

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public fb: FormBuilder,public toastr : ToastrService,private spinner: NgxSpinnerService, public authService:AuthService) { 
    
    this.Constant = this.commonservice.getConstants();

  	//meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Manage Travel Agent Commission '+' - '+this.Constant['SITE_NM']}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Manage Travel Agent Commission');
    //meta tags set

  }

  ngOnInit(): void {
    this.loadTravelAgentCommission();
  }

  public loadTravelAgentCommission(){

    let body = new FormData();
    body.append('user_id', this.authService.loggedInUserId);
    body.append('token', this.Constant['API_TOKEN']);

    
    let options = this.commonservice.generateRequestHeaders(false);
    this.commonservice.SubmiPostFormData('get_agent_commission_list',body,options)
    .then((response) => {  
      console.log(response.data);        
      if(response.status == true){
        if(response.data.length  > 0){
          this.agentCommission.data = response.data;
        }
        else{
          this.agentCommission.data = [];
        }
      }  
      else{
        this.agentCommission.data = [];
      }  
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  }


public deleteAgentCommission(id : string = ''){
	let exeFn = (result:any)=>{
      if(result.value){
        
        let body = new FormData();
        body.append('commission_id', id);
        body.append('user_id', this.authService.loggedInUserId);
        body.append('token', this.Constant['API_TOKEN']);
    
        let options = this.commonservice.generateRequestHeaders(false);
        this.commonservice.SubmiPostFormData('delete_agent_commission',body,options)
        .then((response) => {          
          if(response.status == true){
            this.toastr.success(response.message);
            this.loadTravelAgentCommission();
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
    this.commonservice.showConfirmDialog('Delete','Are you sure you want to delete this Agent Commission','Yes','No',exeFn);
  }

}
