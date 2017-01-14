import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { RobotListPage } from '../pages/robot-list/robot-list';
import { GuessAgeModalPage } from '../pages/guess-age-modal/guess-age-modal'
import { StreamPage } from '../pages/streamModal/stream-modal';

import { SafePipe } from '../pipes/safe-pipe';


import { RobotProvider } from '../providers/robot-provider'
import { RobotListProvider } from '../providers/robotList-provider'
import { AuthData } from '../providers/auth-data';

// Import the AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyAL61_3vN3Zg9fi7i_q_O9vqrSyIGo80zI",
    authDomain: "integratedproject-ecf11.firebaseapp.com",
    databaseURL: "https://integratedproject-ecf11.firebaseio.com",
    storageBucket: "integratedproject-ecf11.appspot.com",
    messagingSenderId: "1058090232242"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    RobotListPage,
    StreamPage,
    GuessAgeModalPage,
    SafePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    RobotListPage,
    StreamPage,
    GuessAgeModalPage
  ],
  providers: [RobotProvider,AuthData,RobotListProvider]
})
export class AppModule {}
