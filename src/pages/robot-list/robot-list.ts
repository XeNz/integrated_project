import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RobotListProvider } from '../../providers/RobotList-provider';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


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

  constructor(public navCtrl: NavController,
             private robotListProvider:RobotListProvider,
             af:AngularFire) 
             {
               this.af = af;
             }

  ionViewDidLoad() {
    console.log('Hello RobotListPage Page');
  }

  addRobotToList(user, ip){
    this.robotListProvider.addRobotToList(user, ip);
  }

  // addRobotToLost(user, ip){
  //   let robotList = this.af.database.object(user + '/robotList/');
  //     robotList.update({
  //       ip: ip
  //     });
  // }

}
