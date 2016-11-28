import { StatusBar, Splashscreen } from 'ionic-native';
import { Component, ViewChild } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Platform, MenuController, Nav } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SettingsPage } from '../pages/settings/settings';
import { UserPage } from '../pages/user/user';
import { SignoutPage } from '../pages/signout/signout';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // set rootpage
  rootPage: any;
  pages: Array<{ title: string, component: any }>;
  af: AngularFire;

  constructor(public platform: Platform, public menu: MenuController, af: AngularFire) {
    // set our app's pages
    this.af = af;
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'User', component: UserPage },
      { title: 'Settings', component: SettingsPage },
      { title: 'Signout', component: SignoutPage },

      //{ title: 'Signin', component: SigninPage}
    ];
    this.af.auth.subscribe( user => {
    if (user) {
      this.rootPage = HomePage;
    } else {
      this.rootPage = LoginPage;
    }
    });
    platform.ready().then(() => {
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    StatusBar.styleDefault();
    Splashscreen.hide();
    });
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.menu.close();
    this.nav.push(page.component);
    //this.nav.setRoot(page.component);
  }
}
