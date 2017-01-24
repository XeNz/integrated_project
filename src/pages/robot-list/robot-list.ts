import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController, MenuController } from 'ionic-angular';

import { Subscription } from 'rxjs/Subscription';
import { RobotListProvider } from '../../providers/robotList-provider';
import { AngularFire } from 'angularfire2';
import { RobotProvider } from '../../providers/robot-provider';

import { Pepper } from '../../models/pepper';
import { Nao } from '../../models/nao';
import { Jibo } from '../../models/jibo';

import { HomePage } from '../home/home';



@Component({
  selector: 'page-robot-list',
  templateUrl: 'robot-list.html'
})
export class RobotListPage {
  robotListSubscription: Subscription;
  robotList: any[];
  af: AngularFire;
  user: any;
  type: any;
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
  }

  ionViewDidLoad() {
    this.getRobotList();
  }
  ionViewWillLeave() {
    this.robotListSubscription.unsubscribe();
  }

  addRobotToList() {
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
            // Check if input is a valid IPv4 or IPv6 address
            if (this.validateIP(data)) {
              // Get the robot type
              this.robotProvider.getType(data.robotIP)
                .subscribe(typeData => {
                  this.type = typeData.type;
                  // Add robot to list
                  this.robotListProvider.addRobotToList(this.user, data.robotIP, this.type);
                }, error => {
                  prompt.dismiss();
                  let ipvalidateToast = this.toastCtrl.create({
                    message: 'Cannot connect to ip.',
                    duration: 3000
                  });
                  ipvalidateToast.present();
                  setTimeout(function () {
                    ipvalidateToast.dismiss();
                  }, 2000);
                });
            } else {
              let ipvalidateToast = this.toastCtrl.create({
                message: 'Please provide a valid ip.',
                duration: 3000
              });
              ipvalidateToast.present();
              setTimeout(function () {
                ipvalidateToast.dismiss();
              }, 2000);
            }
          }
        },
      ]
    });
    prompt.present();
  }

  validateIP(data) {
    var regExprIPv4 = new RegExp('^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$');
    var regExprIPv6 = new RegExp('^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$');
    if (regExprIPv4.test(data.robotIP) || regExprIPv6.test(data.robotIP)) {
      return true;
    } else {
      return false;
    }
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
    this.robotListSubscription = this.robotListProvider.getRobotList(this.user)
      .subscribe(data => {
        this.robotList = data;
      });
  }
  unsubscribeRobotList() {
    this.robotListSubscription
  }
  deleteRobotIP(robotIP, key: string) {
    let prompt = this.alertCtrl.create({
      title: 'Are you sure you want to delete this IP?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: data => {
            this.robotListProvider.deleteRobotIP(this.user, robotIP, key);
            // this.getRobotList();
            var deleteRobotToast = this.toastCtrl.create({
              message: 'Successfully deleted ' + robotIP + '.',
              duration: 3000
            });
            deleteRobotToast.present();
            setTimeout(function () {
              deleteRobotToast.dismiss();
            }, 2000);

          }
        },
      ]
    });
    prompt.present();
  }
}
