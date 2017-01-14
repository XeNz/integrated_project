import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
    templateUrl: 'stream-modal.html',
})
export class StreamPage {
    private URL: String;
    constructor(public navCtrl: NavController, private viewCtrl: ViewController) {
        this.URL = 'https://www.youtube.com/embed/zDpoayP8OQc?feature=player_embedded';
     }

    dismiss(){
        this.viewCtrl.dismiss();
    }
}

