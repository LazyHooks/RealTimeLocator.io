import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  Loading,
  LoadingController,
  AlertController,
  Alert,
  NavParams
} from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//import { FirestoreProvider } from '../../providers/firestore/firestore';
import {AuthService} from '../../services/auth.service';
import { LoginPage } from '../login/login';
import { RestProvider } from '../../providers/rest/rest';


/**
 * Generated class for the UserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:'user-info',segment:'user'})
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {

  storeForm: FormGroup; // This is the form we're creating.
  createStoreError: string;
  /*storeOpeningTime: string;
  storeClosingTime:string;*/

  constructor(fb: FormBuilder,public navCtrl: NavController, public navParams: NavParams,private auth: AuthService,private restService:RestProvider ) {
		this.storeForm = fb.group({
			storeName: '',
      storeType: '',
      storeLocationCoordinatesLat: '',
      storeLocationCoordinatesLon: '',
      storeOpeningTime:'',
      storeClosingTime:''

		});

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoPage');
  }
  checkUserInfo() {
  
      this.navCtrl.push(LoginPage)
    
  }
  createStore() {
    if(this.auth.authenticated){
      let data = this.storeForm.value;
      let store_data = {storeEmail:this.auth.getEmail(),storeName:data.storeName,storeType:data.storeType,storeLocationCoordinates:[data.storeLocationCoordinatesLat,data.storeLocationCoordinatesLon],storeOpeningTime:data.storeOpeningTime,storeClosingTime:data.storeClosingTime}
      //console.log(store_data)

      this.restService.createStore(store_data).subscribe(
          store_data => {
            console.log(store_data);
            this.navCtrl.push('manage-store')

          },
          err => {
            console.log(err)
            this.createStoreError = err.message
          }
      );
    } 

}

}
