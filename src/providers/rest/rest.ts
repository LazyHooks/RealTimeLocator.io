import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { environment } from '../../environments/environment.dev';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = environment.apiUrl; 
  

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
      
  }

  createStore(store_data) {

    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');   
    let options = {
        headers: httpHeaders
       }; 
    return this.http.post(this.apiUrl+'api/stores', JSON.stringify(store_data),options);
  }

  getStore(storeEmail) {

    /*let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');   
    let options = {
        headers: httpHeaders
       }; */
    return this.http.get(this.apiUrl+'api/store/'+storeEmail);
  } 



}
