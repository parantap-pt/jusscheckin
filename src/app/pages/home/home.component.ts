import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public Constant : any;

  constructor(public commonservice:CommonService,) { 

    this.Constant = this.commonservice.getConstants();
    console.log(this.Constant['API_END_POINT']);
    //meta tags set
    var meta_tag = [
      {name : 'og:title' , content : 'Home'}
    ];
    this.commonservice.changeMetaTagOfPage(meta_tag);
    this.commonservice.setTitle('Home');
    //meta tags set

  }

  ngOnInit(): void {
  }

}
