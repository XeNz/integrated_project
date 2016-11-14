import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SettingsPage } from '../pages/settings/settings';
import { UserPage } from '../pages/user/user';
import { SignoutPage } from '../pages/signout/signout';
import { RobotProvider } from '../providers/robot-provider'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    SignoutPage,
    SettingsPage,
    UserPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SignoutPage,
    SettingsPage,
    UserPage
  ],
  providers: [RobotProvider,]
})
export class AppModule {}
