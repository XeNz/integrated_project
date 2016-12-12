import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
    templateUrl: 'stream-modal.html'
})
export class StreamPage {
    constructor(public navCtrl: NavController, private viewCtrl: ViewController) { }

    dismiss(){
        this.viewCtrl.dismiss();
    }
}
