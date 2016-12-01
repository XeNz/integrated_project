import { StatusBar, Splashscreen } from 'ionic-native';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, ToastController } from 'ionic-angular';

import { AngularFire } from 'angularfire2';
import { AuthData } from '../providers/auth-data';

import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SettingsPage } from '../pages/settings/settings';
import { UserPage } from '../pages/user/user';
import { SignoutPage } from '../pages/signout/signout';
import { LoginPage } from '../pages/login/login';
import { RobotListPage } from '../pages/robot-list/robot-list';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // set rootpage
  rootPage: any;
  pages: Array<{ title: string, component: any }>;
  af: AngularFire;

  constructor(public platform: Platform, public menu: MenuController, af: AngularFire, public toastCtrl: ToastController, public authData: AuthData) {
    // set our app's pages
    this.af = af;
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'User', component: UserPage },
      { title: 'Settings', component: SettingsPage },

    ];
    this.af.auth.subscribe(user => {
      console.log(user);
      if (user) {
        this.nav.setRoot(RobotListPage, { user: user.uid });
      } else {
        this.nav.setRoot(LoginPage);
      }
    });
    platform.ready().then(() => {
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
  
  signOut() {
    //clear session, close menu, redirect
    this.menu.close();
    this.presentLogoutToast();
    this.authData.logoutUser();
    this.nav.setRoot(SigninPage);
  }

  presentLogoutToast() {
    let toast = this.toastCtrl.create({
      message: 'You have signed out successfully.',
      duration: 3000
    });
    toast.present();
  }
}
