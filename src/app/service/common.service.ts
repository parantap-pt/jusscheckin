import { Injectable , Inject,Pipe, PipeTransform} from '@angular/core';
import {HttpClient ,HttpHeaders,HttpInterceptor,HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { DOCUMENT, formatDate, SlicePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Meta,Title } from '@angular/platform-browser'; 
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

    private headers: HttpHeaders;
    private options: any;
    public Constant : any = [];
    
    async load() : Promise<any> {
		this.Constant['API_END_POINT'] = environment.API_END_POINT;
		this.Constant['API_TOKEN'] = environment.API_TOKEN;
		this.Constant['RECORD_PER_PAGE'] = 10;
		this.Constant['PAGES_IN_PAGINATION'] = 5;
		


		let body = new FormData();
		body.append('token', environment.API_TOKEN);
	    let options = this.generateRequestHeaders(false);
		this.SubmiPostFormData('get_setting',body,options)
		.then((response) => {   
		if(response.status == true){
			//console.log(response);
			this.Constant['META_DESCRIPTION'] = response.data.site_name;
			this.Constant['META_KEYWORDS'] = response.data.site_name;
			this.Constant['META_AUTHOR'] = response.data.site_name;
			this.Constant['SITE_NM'] = response.data.site_name;
		}  
		}).catch(this.handleError);
	}

    constructor(@Inject(DOCUMENT) private document: HTMLDocument,private http: HttpClient,private titleService : Title,private meta: Meta,private spinner: NgxSpinnerService) { }

    public generateRequestHeaders(urlEncoded : boolean = true){
    	this.headers = new HttpHeaders();
    	
    	this.headers.append('Cache-Control','no-cache');
    	this.headers.append('Access-Control-Allow-Origin','*');
		this.headers.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
		if(urlEncoded){
			this.headers.append('Accept','application/json');
			this.headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
		}
    	this.options = {headers : this.headers,observe:"body"};
    	return this.options;
	}

	private extractData(response: any ) {
		return response;
    }

	public SubmiPostFormData(url : string,body : any,options:any) : Promise<any>{
		//this.spinner.show();
    	return this.http
    	.post(this.Constant['API_END_POINT']+url,body,options)
    	.toPromise()
    	.then((response) => {   
    	  //this.spinner.hide();	
	      return response;
	    }).catch(this.handleError);
	}

    private handleError (error: HttpErrorResponse) {		
    	let errMsg = '';
    	if (error.error instanceof Error) {
    		errMsg = error.message || 'Client-side error occured.'; 
    	} else {
    		errMsg = error.message || 'Server-side error occured.'; 
    	}
    	//return Observable.throw(errMsg); // returns the message in a new, failed observable
    }

    public getConstants(){
		//$("#FAV_ICON").attr("href",this.Constant['SITE_FAVICON']);
		return this.Constant;
	}

	public changeMetaTagOfPage(meta_tags : any = []){
    	this.meta.updateTag({ name: 'description', content: this.Constant['META_DESCRIPTION']});
		this.meta.updateTag({ name: 'keywords', content: this.Constant['META_KEYWORDS']});
		this.meta.updateTag({ name: 'author', content: this.Constant['META_AUTHOR']});
		if(meta_tags.length > 0){
			meta_tags.forEach((item : any = [],index : any = []) => {
				this.meta.updateTag({ name: item.name, content: item.content});
			});
    	}
    }

    public setTitle( newTitle: string) {
		this.titleService.setTitle( newTitle );
	}

	public checkVar(chkVar : any,returnDefault : string = ''){
		if(chkVar == null || chkVar == undefined || chkVar == ""){
			return returnDefault;
		}else{
			return chkVar;
		}
	}

	public getCookieValue(a : any = []) {
		var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
		return b ? b.pop() : '';
	}

	public deleteAllCookie(){
		document.cookie.split(";").forEach(function(c) { 
			document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
		});
	}

	public showConfirmDialog(title : string = '',text : string = '',confirmText : string,cancelText : string,executeFunction : Function){

		Swal.fire({
			title: title,
			text: text,
			showCancelButton: true,
			confirmButtonText: confirmText,
			cancelButtonText: cancelText
		}).then((result) => {
			executeFunction(result);
		});
	}


}
