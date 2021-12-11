import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '.././../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  public authRedirectURL = '';
  public isLoggedIn : boolean = false;
  public loggedInUserId : string = '';	
  public loggedInUserData : any = [];
  public route : any = [];

  private headers: HttpHeaders;
	private options: any;

  async load() : Promise<any> {
    
    var BaseUrl = environment.API_END_POINT;

    if(localStorage.getItem("auth_token") && localStorage.getItem("auth_token") !== null && localStorage.getItem("auth_token") !== undefined && localStorage.getItem("auth_token") != '' ){
      var auth_token =  localStorage.getItem('auth_token');
      if(auth_token != ''){
      /*let headers : object[] = [];
        return this.http
        .post(BaseUrl+'getTokenData/'+auth_token,{})
        .toPromise()
        .then((response: any )=>{
          if(response.status){
            response.data.auth_token = response.data.token;
            this.grantAuth(response.data.user_id,response.data);
            return true;
          }else{
            this.removeAuth();
          }
        });*/
        this.isLoggedIn = true;
        this.loggedInUserId = '1';
        this.loggedInUserData.user_id = 1;
      }else{
        this.removeAuth();
      }
      
    }
  }
  
  constructor(private http: HttpClient) { 
  }

  public grantAuth(loggedInUserId1 : string,loggedInUserData : any){

    this.isLoggedIn = true;
    this.loggedInUserId = loggedInUserId1;
    this.loggedInUserData = loggedInUserData;
    localStorage.setItem('auth_token',this.loggedInUserData.auth_token);
  }

  public removeAuth(){

    this.isLoggedIn = false;
    this.loggedInUserId = '';
    this.loggedInUserData = [];
    localStorage.removeItem('auth_token');
  }
}
