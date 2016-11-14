import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RobotProvider } from '../../providers/robot-provider';


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

  constructor(public navCtrl: NavController, private robotProvider: RobotProvider) {}

  robotIP: any;
  ionViewDidLoad() {
    console.log('Hello SigninPage Page');
  }
  checkLogin() {
  	//check for living connection (ping ip)
  	//if no response -> timeout
  	//otherwise redirect to HomePage and save ip in variable
  	//http://www.gajotres.net/ionic-2-making-rest-http-requests-like-a-pro/
  	this.robotProvider.signIn("192.168.56.101").subscribe(data => {
      this.robotIP = data;
      console.log(this.robotIP);
      });
    this.navCtrl.setRoot(HomePage);
  }

}
