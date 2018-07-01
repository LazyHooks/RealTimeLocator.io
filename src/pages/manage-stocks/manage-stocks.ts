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
 * Generated class for the ManageStocksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:'manage-stocks',segment:'manage-stocks'})
@Component({
  selector: 'page-manage-stocks',
  templateUrl: 'manage-stocks.html',
})
export class ManageStocksPage {

  stockForm: FormGroup; // This is the form we're creating.

  storeEmail : string;
  storeName : string;
  storeType: string;
  storeId: string;
  //storeLocationCoordinates:any[];
  storeLocationCoordinatesLat:String;
  storeLocationCoordinatesLon:String;
  storeOpeningTime:string;
  storeClosingTime:string;

  constructor(fb: FormBuilder,public navCtrl: NavController, public navParams: NavParams,private auth: AuthService,private restService:RestProvider ) {
		this.stockForm = fb.group({
			productName: '',
      productQuantity: '',
      isAvailable: '',
      productSellPrice: ''
    });
    
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
          this.storeId = store[0]['_id']
          this.storeLocationCoordinatesLat = store[0].storeLocationCoordinates[0]
          this.storeLocationCoordinatesLon = store[0].storeLocationCoordinates[1]
          this.storeOpeningTime = store[0].storeOpeningTime
          this.storeClosingTime = store[0].storeClosingTime
          

        },
        err => {
          console.log(err)
        }
    );


    }
  }

  addStock(){ //as of now Edit stocks too,the crude way,tho. 

    if(this.auth.authenticated){
      let data = this.stockForm.value;
      
      let store_data = {storeName:this.storeName,storeType:this.storeType,storeId:this.storeId,storeEmail:this.storeEmail,storeLocationCoordinates:[this.storeLocationCoordinatesLat,this.storeLocationCoordinatesLon],storeOpeningTime:this.storeOpeningTime,storeClosingTime:this.storeClosingTime} // stores the data of the store in which the stock belongs to.
      
      let stock_data = {productName:data.productName,productQuantity:data.productQuantity,isAvailable:data.isAvailable,productSellPrice:data.productSellPrice,storeData:store_data}
      
      console.log(store_data)
      
      console.log(stock_data)

      this.restService.addStock(stock_data).subscribe(
          stock_data => {
            console.log(stock_data);
            //this.navCtrl.push('manage-store')

          },
          err => {
            console.log(err)
          }
      );
    }

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageStocksPage');
  }

}
