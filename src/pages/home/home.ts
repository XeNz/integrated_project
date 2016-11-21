import { Component } from '@angular/core';
import { RobotProvider } from '../../providers/robot-provider';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //dirty fix ionic2
  public text = null;
  public volume = null;
  public moveCoordinateX = null;
  public moveCoordinateY = null;
  public moveCoordinateD = null;


  public robotType: any;
  public robotIP: any;
  public robotName: any;
  public batteryLevel: any;
  public actions: any;

  constructor(public navCtrl: NavController, public params:NavParams, public robotProvider:RobotProvider) {
      this.robotType = params.get('robotType');
      this.robotIP = params.get('robotIP');
      this.getName();
      //first time
      this.checkBatteryLevel();
      //repeat
      this.repeatCheckBatteryLevel();
      this.getActions();
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

  getName(){
    this.robotProvider.getName(this.robotIP).subscribe(
      data => {
        this.robotName = data.name;
        console.log(this.robotName);
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
              console.log(data.posture);
          },
          err => {
              console.log(err);
          });
  }

  getActions(){
      this.robotProvider.getActions(this.robotIP).subscribe(
          data => {
              this.actions = data.actions;
              console.log(data);
          },
          err => {
              console.log(err);
          });
  }

  move(moveCoordinateX, moveCoordinateY, moveCoordinateD){
      this.robotProvider.move(this.robotIP, moveCoordinateX, moveCoordinateY, moveCoordinateD).subscribe(
          data => {
              console.log(data);
          },
          err => {
              console.log(err);
          });
  }
}
