import { Component } from '@angular/core';
import { NavController, ToastController} from 'ionic-angular';
import { SigninPage } from '../signin/signin';

/*
  Generated class for the Signout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signout',
  templateUrl: 'signout.html'
})
export class SignoutPage {

  constructor(public navCtrl: NavController,public toastCtrl: ToastController) {}

  ionViewDidLoad() {
    console.log('Hello SignoutPage Page');
  }

  signOut() {
  	//clear ROBOT IP variable
  	//redirect to sign in page
  	this.presentToast();
    this.navCtrl.setRoot(SigninPage);
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'You have signed out successfully.',
      duration: 3000
    });
    toast.present();
  }

}
