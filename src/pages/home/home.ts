import { Component } from '@angular/core';
//import { RobotProvider } from '../../providers/robot-provider';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public robotType: any;

  constructor(public navCtrl: NavController, public params:NavParams) {
      this.robotType = params.get("robotType");
  }

}
