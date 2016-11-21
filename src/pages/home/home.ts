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
      this.repeatCheckBatteryLevel();
  }

  checkBatteryLevel() {
  	//check for living connection (ping ip)
  	//if no response -> timeout
    //check robot type and store in variable
  	//otherwise redirect to HomePage and save ip in variable
  	//http://www.gajotres.net/ionic-2-making-rest-http-requests-like-a-pro/
  	this.robotProvider.getBatteryLevel(this.robotIP).subscribe(
  	  data => {
      	this.batteryLevel = data.level;
      	console.log(this.batteryLevel);

      },
      err => {
      	console.log(err)
      });

  }

  repeatCheckBatteryLevel(){
    setInterval(() => {
        this.checkBatteryLevel();
    }, 30000);
  }

  ask(text) {
  	//check for living connection (ping ip)
  	//if no response -> timeout
    //check robot type and store in variable
  	//otherwise redirect to HomePage and save ip in variable
  	//http://www.gajotres.net/ionic-2-making-rest-http-requests-like-a-pro/
  	this.robotProvider.ask(this.robotIP, text).subscribe(
  	  data => {
      	console.log(data.text);
      },
      err => {
      	console.log(err);
      });
  }
  
  action(action){
      this.robotProvider.action(this.robotIP, action).subscribe(
          data => {
              console.log(data);
          },
          err => {
              console.log(err);
          }
      )
  }
}
