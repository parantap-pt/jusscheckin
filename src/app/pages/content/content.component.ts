import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  public Constant : any;
  public page : any = {data : []};
  public page_name : any;

  constructor(public commonservice:CommonService,private activatedRoute: ActivatedRoute,private router: Router,public authService:AuthService) { 
    this.Constant = this.commonservice.getConstants();
    //meta tags set
     var meta_tag = [
       {name : 'og:title' , content : 'Content '+' - '+this.Constant['SITE_NM']}
     ];
     this.commonservice.changeMetaTagOfPage(meta_tag);
     this.commonservice.setTitle('Content');
     //meta tags set


     this.page_name = this.activatedRoute.snapshot.paramMap.get('name');
  }

  ngOnInit(): void {
    
    let body = new FormData();
    body.append('token', this.Constant['API_TOKEN']);

    let options = this.commonservice.generateRequestHeaders();
    this.commonservice.SubmiPostFormData(this.page_name,body,options)
    .then((response) => {          
      if(response.status == true){
        this.page = response.data[0];
        console.log(this.page);
      }  
    });
  	

  }

}
