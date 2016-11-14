import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';


/*
  Generated class for the Signin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello SigninPage Page');
  }
  checkLogin() {
  	//check for living connection (ping ip)
  	//if no response -> timeout
  	//otherwise redirect to HomePage and save ip in variable
    this.navCtrl.push(HomePage);
  }

}
