import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Robot } from '../../models/robot';


/*
  Generated class for the GuessAgeModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-guess-age-modal',
  templateUrl: 'guess-age-modal.html'
})
export class GuessAgeModalPage {
  robot: Robot;

  constructor(public navCtrl: NavController, private viewCtrl: ViewController, private navParams: NavParams) {
    this.robot = this.navParams.data;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  guessAge() {
    this.robot.guessAge();
  }
}
