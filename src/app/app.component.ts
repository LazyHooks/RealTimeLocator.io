import { Component , ViewChild} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth.service';
import { App, MenuController, Nav } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

	private app;
	private platform;
  private menu: MenuController;
  
  @ViewChild(Nav) nav: Nav;

  constructor(app: App,platform: Platform, private statusBar: StatusBar, splashScreen: SplashScreen,private auth: AuthService,menu: MenuController,) {
    this.menu = menu;
    this.app = app;
    this.platform = platform;
    this.initializeApp();
    

    /*platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });*/
  }

  login() {
    this.menu.close();
    this.auth.signOut();
    this.nav.setRoot(LoginPage);
  }

  logout() {
    this.menu.close();
    this.auth.signOut();
    this.nav.setRoot(HomePage);
  }
	initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
    this.rootPage = LoginPage;
    
    /*this.auth.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            this.rootPage = HomePage;
          } else {
            this.rootPage = LoginPage;
          }
        },
        () => {
          this.rootPage = LoginPage;
        }
      );*/
}
}

