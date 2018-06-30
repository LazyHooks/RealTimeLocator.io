import { Component, ViewChild } from '@angular/core';
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
//import {AuthService} from '../../services/auth.service';
//import { LoginPage } from '../login/login';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the UserSearchForGoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:'user-search-goods',segment:'user-search-goods'})
@Component({
  selector: 'page-user-search-for-goods',
  templateUrl: 'user-search-for-goods.html',
})
export class UserSearchForGoodsPage {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  //isTracking = false;

  currentLat: any;
  currentLong: any;


  marker: google.maps.Marker;
  userSearchProductForm : FormGroup; // This is the form we're creating.
  stocksForWhichProductIsAvailable: any[] = [] ;

  /*extractStoreData = function(res_data){

    if(res_data.length != 0){


      var storeLocationCoordinates =  res_data.storeData.storeLocationCoordinates






    }
  }*/

  constructor(fb: FormBuilder,public navCtrl: NavController, public navParams: NavParams,private restService:RestProvider) {
    
    this.userSearchProductForm = fb.group({
      productSearched:''
    });

    this.initializeApp();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSearchForGoodsPage');
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


      

    

    getStoreForSearchedProduct(){
      var date = new Date();
      let currentTime = date.getHours().toString()
      
      console.log('time is' + currentTime.toString())

      let data = this.userSearchProductForm.value;
      var productName = data.productSearched
      
      
      this.restService.getStoreForSearchedProduct(productName,currentTime).subscribe(
        res_data => {
          console.log(res_data);
          //this.navCtrl.push('manage-store')

          if(Array.isArray(res_data)){ 
            
            console.log(res_data)

            if(res_data.length != 0){ // product available


              this.stocksForWhichProductIsAvailable = res_data

              for(var i = 0;i<res_data.length;i++){

              var storeLocationCoordinates =  res_data[i].storeData.storeLocationCoordinates // array[lat,lon] 

              var latLng = new google.maps.LatLng(storeLocationCoordinates[0],storeLocationCoordinates[1]);

              this.marker = new google.maps.Marker({

                position: latLng,
                map: this.map
              });

            }





        
        
        
        
        
        
            }

            else{
              console.log("Too late or too early..search later maybe....")
            }


            


          }
          else{ //not available in any store.
            console.log(res_data)
          }
        },
        err => {
          console.log(err)
        }
    );
    }
    




}
