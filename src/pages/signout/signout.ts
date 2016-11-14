import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Signout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signout',
  templateUrl: 'signout.html'
})
export class SignoutPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello SignoutPage Page');
  }

}
