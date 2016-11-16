import { Component } from '@angular/core';
import { RobotProvider } from '../../providers/robot-provider';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public robotType: any;
  public robotIP: any;
  public batteryLevel: any;

  constructor(public navCtrl: NavController, public params:NavParams, public robotProvider:RobotProvider) {
      this.robotType = params.get('robotType');
      this.robotIP = params.get('robotIP');
      this.checkBatteryLevel();
  }

  checkBatteryLevel() {
  	//check for living connection (ping ip)
  	//if no response -> timeout
    //check robot type and store in variable
  	//otherwise redirect to HomePage and save ip in variable
  	//http://www.gajotres.net/ionic-2-making-rest-http-requests-like-a-pro/
  	this.robotProvider.getBatteryLevel(this.robotIP).subscribe(
  	  data => {
      	this.batteryLevel = data;
      	console.log(data.batteryLevel);

      },
      err => {
      	console.log(err)
      });

  }

}
