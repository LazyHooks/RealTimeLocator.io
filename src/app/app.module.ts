//import { NgModule } from '@angular/core';
import { NgModule } from '@angular/core';
import { ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HttpClientModule } from '@angular/common/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { firebaseConfig } from '../config';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../services/auth.service';

import { NgxErrorsModule } from '@ultimate/ngxerrors'
import { RestProvider } from '../providers/rest/rest';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFirestoreModule,
    NgxErrorsModule

    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage 

  ],
  providers: [
    SplashScreen,
    StatusBar,
  
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthService,
    RestProvider
   
  ]
})
export class AppModule {}
