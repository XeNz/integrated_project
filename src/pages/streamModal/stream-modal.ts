import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    templateUrl: 'stream-modal.html'
})
export class StreamPage {
    constructor(public navCtrl: NavController) { }

    ionViewDidLoad() {
        console.log('Hello stream Page');
    }
}
