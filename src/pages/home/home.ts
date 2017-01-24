import { Component } from '@angular/core';
import { RobotProvider } from '../../providers/robot-provider';
import { NavController, NavParams, MenuController, ModalController, ToastController } from 'ionic-angular';
import { Robot } from '../../models/robot'
import { Pepper } from '../../models/pepper'
import { Nao } from '../../models/nao'
import { Jibo } from '../../models/jibo'
import { StreamPage } from '../streamModal/stream-modal'
import { GuessAgeModalPage } from '../guess-age-modal/guess-age-modal'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    //dirty fix ionic2
    public move = null;
    public ask = null;
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
    public numberOfActions: number;


    public robot: Robot;

    constructor(public navCtrl: NavController, private modalController: ModalController, public params: NavParams, public robotProvider: RobotProvider, private menuCtrl: MenuController, public toastCtrl: ToastController) {
        this.menuCtrl.enable(true);
        this.robot = params.get('robot');
        this.castRobotType();
        this.robot.getName();

        //first time
        this.robot.checkBatteryLevel();
        //repeat
        this.robot.repeatCheckBatteryLevel();
        this.robot.getActions();
        this.numberOfActions = this.robot.action.length;
        // this.robot.getVolume();
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

    presentStream() {
        let streamPage = this.modalController.create(StreamPage);
        streamPage.present();
    }

    presentGuessAge() {
        let guessAgePage = this.modalController.create(GuessAgeModalPage, this.robot);
        guessAgePage.present();
    }

    executeAction(action){
        this.robot.action(action);
        let actionToast = this.toastCtrl.create({
            message: action + ' executed!',
            duration: 3000
        });
        actionToast.present();
    }
}
