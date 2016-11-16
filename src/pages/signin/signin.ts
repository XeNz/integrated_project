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

  robotType: any;
  ionViewDidLoad() {
    console.log('Hello SigninPage Page');
  }
  checkLogin(robotIP) {
  	//check for living connection (ping ip)
  	//if no response -> timeout
    //check robot type and store in variable
  	//otherwise redirect to HomePage and save ip in variable
  	//http://www.gajotres.net/ionic-2-making-rest-http-requests-like-a-pro/
  	this.robotProvider.signIn(robotIP).subscribe(data => {
      this.robotType = data;
      console.log(this.robotType);
      });
    this.navCtrl.setRoot(HomePage, { robotType: this.robotType.type });
  }

}
