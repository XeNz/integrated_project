import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../validators/email';
import { RobotListPage } from '../robot-list/robot-list';
import { AngularFire } from 'angularfire2';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  user: any;
  loading;
  af: AngularFire;


  constructor(public nav: NavController, public authData: AuthData,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public toastCtrl: ToastController, af: AngularFire) {

    this.af = af;
    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required,
      EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6),
      Validators.required])]
    });
  }


  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }


  signupUser() {
    this.submitAttempt = true;
    var accountCreatedToast = this.toastCtrl.create({
      message: 'Successfully created account.',
      duration: 3000
    });
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });


    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password).then(() => {

        // userid scope issue fix
        this.authData.loginUser(this.signupForm.value.email, this.signupForm.value.password).then(() => {
          this.af.auth.subscribe(user => {
            if (user) {
              this.nav.setRoot(RobotListPage, { user: user.uid });
              accountCreatedToast.present();
              setTimeout(function () {
                accountCreatedToast.dismiss();
              }, 2000);
              this.loading.present();
            }
          });
        });
      });
    }
  }
};
