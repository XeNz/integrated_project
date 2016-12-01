import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController, MenuController } from 'ionic-angular';

import { RobotListProvider } from '../../providers/robotList-provider';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { RobotProvider } from '../../providers/robot-provider';

import { Robot } from '../../models/robot';
import { Pepper } from '../../models/pepper';
import { Nao } from '../../models/nao';
import { Jibo } from '../../models/jibo';

import { HomePage } from '../home/home';


/*
  Generated class for the RobotList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-robot-list',
  templateUrl: 'robot-list.html'
})
export class RobotListPage {
  robotList: any[];
  af: AngularFire;
  user: any;
  robotIP = null;
  robotType: any;
  loader = this.loadingCtrl.create({
    content: "Please wait...",
  });
  errorToast = this.toastCtrl.create({
    message: 'Unable to connect. Please try again.',
    duration: 3000
  });

  constructor(public navCtrl: NavController, private robotListProvider: RobotListProvider, af: AngularFire, public params: NavParams, private robotProvider: RobotProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public alertCtrl: AlertController, private menuCtrl: MenuController) {
    this.menuCtrl.enable(false);
    this.user = params.get('user');
    this.af = af;
    this.getRobotList();
  }

  ionViewDidLoad() {
    
  }

  addRobotToList() {
    console.log(this.user);
    let prompt = this.alertCtrl.create({
      title: 'Add a new robot IP',
      inputs: [
        {
          name: 'robotIP',
          placeholder: 'IP adress',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            this.robotListProvider.addRobotToList(this.user, data.robotIP);
          }
        },
      ]
    });
    prompt.present();

  }

  presentLoading() {
    this.loader.present();
  }
  checkLogin(robotIP) {
    this.presentLoading();
    this.robotProvider.signIn(robotIP).subscribe(
      data => {
        this.robotType = data.type;
        let robot: any;
        if (this.robotType == "NAO") {
          let nao = new Nao(this.robotType, robotIP, this.robotProvider);
          robot = nao;
        }
        else if (this.robotType == "PEPPER") {
          let pepper = new Pepper(this.robotType, robotIP, this.robotProvider);
          robot = pepper;
        }
        else if (this.robotType == "JIBO") {
          let jibo = new Jibo(this.robotType, robotIP, this.robotProvider);
          robot = jibo;
        }
        console.log(robot);
        this.loader.dismissAll();
        this.navCtrl.setRoot(HomePage, { robot: robot })
      },
      err => {
        console.log(err)
        this.loader.dismissAll();
        this.errorToast.present();
        //bug fix for loader error
        this.navCtrl.pop();
        this.navCtrl.push(RobotListPage);
      });
  }

  getRobotList() {
    this.robotListProvider.getRobotList(this.user)
      .subscribe(data => {
        this.robotList = data;
      });
  }
  deleteRobotIP(robotIP) {
    this.robotListProvider.deleteRobotIP(robotIP);
  }
}
