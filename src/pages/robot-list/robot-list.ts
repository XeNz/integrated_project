import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  user: any;

  constructor(public navCtrl: NavController,
             private robotListProvider:RobotListProvider,
             af:AngularFire, public params: NavParams) 
             {
    this.user = params.get('user');
               this.af = af;
               console.log("HALLO");
             }

  ionViewDidLoad() {
    console.log('Hello RobotListPage Page');
  }

  addRobotToList(ip){
    console.log(this.user);
    this.robotListProvider.addRobotToList(this.user, ip);
  }

  // addRobotToLost(user, ip){
  //   let robotList = this.af.database.object(user + '/robotList/');
  //     robotList.update({
  //       ip: ip
  //     });
  // }

}
