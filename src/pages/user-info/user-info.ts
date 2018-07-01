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
import { Component,ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
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

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  //isTracking = false;

  currentLat: any;
  currentLong: any;


  marker: google.maps.Marker;

  storeForm: FormGroup; // This is the form we're creating.
  createStoreError: string;
  /*storeOpeningTime: string;
  storeClosingTime:string;*/

  constructor(fb: FormBuilder,public navCtrl: NavController, public navParams: NavParams,private auth: AuthService,private restService:RestProvider ) {
		this.storeForm = fb.group({
			storeName: '',
      storeType: '',
      //storeLocationCoordinatesLat: '',
      //storeLocationCoordinatesLon: '',
      storeOpeningTime:'',
      storeClosingTime:''

    });
    
    this.initializeApp();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoPage');
  }
  checkUserInfo() {
  
      this.navCtrl.push(LoginPage)
    
  }


  initializeApp(){

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        this.currentLat = position.coords.latitude;
        
        this.currentLong = position.coords.longitude;

        let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        
        var mapProp = {
          center: location,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

        //if (!this.marker) {
        this.marker = new google.maps.Marker({

          position: location,
          map: this.map,
          title: 'Got you!'

        });

        /*}
        else {

          this.marker.setPosition(location);
        }*/

      
      
      
      });


    }

    else {
      alert("Geolocation is not supported by this browser.");
    }



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

}
