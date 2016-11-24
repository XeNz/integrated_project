import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RobotProvider } from '../../providers/robot-provider';
import { Robot } from '../../models/robot'
import { Pepper } from '../../models/pepper'
import { Nao } from '../../models/nao'
import { Jibo } from '../../models/jibo'


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

  constructor(public navCtrl: NavController, private robotProvider: RobotProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {}

  robotIP = null;
  robotType: any;
  loader = this.loadingCtrl.create({
    content: "Please wait...",
  });
  errorToast = this.toastCtrl.create({
    message: 'Unable to connect. Please try again.',
    duration: 3000
  });
  
  ionViewDidLoad() {
    console.log('Hello SigninPage Page');
  }
  checkLogin(robotIP) {
  	//check for living connection (ping ip)
  	//if no response -> timeout
    //check robot type and store in variable
  	//otherwise redirect to HomePage and save ip in variable
  	//http://www.gajotres.net/ionic-2-making-rest-http-requests-like-a-pro/


    this.presentLoading();
  	this.robotProvider.signIn(robotIP).subscribe(
  	  data => {
        this.robotType = data.type;
        let robot: any;
        if (this.robotType == "NAO") {
          let nao = new Nao(this.robotType,this.robotIP,this.robotProvider);
          robot = nao;
        }
        else if (this.robotType == "PEPPER") {
          let pepper = new Pepper(this.robotType,this.robotIP,this.robotProvider);
          robot = pepper;
        }
        else if (this.robotType == "JIBO") {
          let jibo = new Jibo(this.robotType,this.robotIP,this.robotProvider);
          robot = jibo;
        }
      	console.log(robot);
        this.loader.dismissAll();
        //this.navCtrl.setRoot(HomePage, { robotType: this.robotType.type, robotIP: robotIP});
        this.navCtrl.setRoot(HomePage,{robot: robot} )
      },
      err => {
      	console.log(err)
        this.loader.dismissAll();
        this.errorToast.present();
        //bug fix for loader error
        this.navCtrl.pop();
        this.navCtrl.push(SigninPage);
      });
  }
  presentLoading() {
    this.loader.present();
  }
}
