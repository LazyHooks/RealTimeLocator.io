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
 * Generated class for the ManageStorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:'manage-store',segment:'manage-store'})
@Component({
  selector: 'page-manage-store',
  templateUrl: 'manage-store.html',
})
export class ManageStorePage {

  storeEmail : string;
  storeName : string;
  storeType: string;
  storeLocationCoordinatesLat :string;
  storeLocationCoordinatesLon :string;
  storeOpeningTime:string;
  storeClosingTime:string;

  constructor(fb: FormBuilder,public navCtrl: NavController, public navParams: NavParams,private auth: AuthService,private restService:RestProvider ) {

    this.initializeApp();

  }
  initializeApp(){

    if(this.auth.authenticated){

      this.storeEmail = this.auth.getEmail()
      console.log(this.storeEmail)

      this.restService.getStore(this.storeEmail).subscribe(
        store => {
          console.log(store);
          
          this.storeName = store[0].storeName
          this.storeType = store[0].storeType
          this.storeLocationCoordinatesLat = store[0].storeLocationCoordinates[0]
          this.storeLocationCoordinatesLon = store[0].storeLocationCoordinates[1]
          this.storeOpeningTime = store[0].storeOpeningTime
          this.storeClosingTime =store[0].storeClosingTime

        },
        err => {
          console.log(err)
        }
    );


    }
  }
  goToManageStocksPage(){

    this.navCtrl.push('manage-stocks')
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageStorePage');
  }


}
