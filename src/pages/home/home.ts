import { Component } from '@angular/core';
import { RobotProvider } from '../../providers/robot-provider';
import { NavController, NavParams } from 'ionic-angular';
import { Robot } from '../../models/robot'
import { Pepper } from '../../models/pepper'
import { Nao } from '../../models/nao'
import { Jibo } from '../../models/jibo'

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

  
  public robot: Robot;

  constructor(public navCtrl: NavController, public params:NavParams, public robotProvider:RobotProvider) {
    //   this.robotType = params.get('robotType');
    //   this.robotIP = params.get('robotIP');
      this.robot = params.get('robot');
      this.castRobotType();
      this.robot.getName();
      //first time
      this.robot.checkBatteryLevel();
      //repeat
      this.robot.repeatCheckBatteryLevel();
      this.robot.getActions();
      
  }
    
  castRobotType() {
      if (this.robot.robotType == "NAO") {
          this.robot = this.robot as Nao;
      }
      else if (this.robot.robotType == "PEPPER") {
          this.robot = this.robot as Pepper;
      }
      else if (this.robot.robotType == "JIBO") {
          this.robot = this.robot as Jibo;
      }
    }


}
