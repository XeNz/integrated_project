import { Component } from '@angular/core';
import { NavController, ToastController, AlertController, MenuController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login/login';
import { RobotListProvider } from '../../providers/robotList-provider';
import { AngularFire } from 'angularfire2';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public authData: AuthData, public toastCtrl: ToastController, public alertCtrl: AlertController, public menuCtrl: MenuController, public robotListProvider: RobotListProvider, public af: AngularFire) {
    // this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {

  }

  deleteAccount() {
    let alert = this.alertCtrl.create({
      title: 'Delete account',
      message: 'Are you sure you want to delete this account and all its data? This action is irreversible.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            //get current user
            let userId: any;
            this.authData.af.auth.subscribe(user => {
              if (user) {
                userId = user.uid;
                //delete data
                this.robotListProvider.deleteUserData(userId);
                //delete user & expire session
                this.authData.deleteUser();
                this.authData.af.auth.logout();
                //redirect
                this.navCtrl.setRoot(LoginPage);
                let deleteToast = this.toastCtrl.create({
                  message: 'Successfully deleted your account.',
                  duration: 3000
                });
                deleteToast.present();
                // need to unsubscribe to list somehow
              }else{
                console.error("error deleting");
              }
            }).unsubscribe();
          }
        }
      ]
    });
    alert.present();
  }
}
