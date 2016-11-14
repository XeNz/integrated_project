import { StatusBar, Splashscreen } from 'ionic-native';
import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SettingsPage } from '../pages/settings/settings';
import { UserPage } from '../pages/user/user';
import { SignoutPage } from '../pages/signout/signout';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // set rootpage
  rootPage: any = SigninPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'User', component: UserPage },
      { title: 'Settings', component: SettingsPage },
      { title: 'Signout', component: SignoutPage },

      //{ title: 'Signin', component: SigninPage}
    ];
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
