import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RobotProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RobotProvider {

  robotPort: string = ":5000";

  constructor(public http: Http) {
    console.log('Hello RobotProvider Provider');
  }

  //
  //https://codybonney.com/allow-cross-origin-resource-sharing-cors-using-flask/
  //
  signIn(robotIP) {
      var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/getType';

      var response = this.http.get(url).map(res => res.json());
      return response;

      //console.log(this.response);
  }

  getBatteryLevel(robotIP) {
      var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/getBatteryLevel';

      var response = this.http.get(url).map(res => res.json());
      return response;

      //console.log(this.response);
  }

  ask(robotIP, text){
      var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/ask/' + text;
      var response = this.http.get(url).map(res => res.json());
      return response;
  }

  action(robotIP, action){
      var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/action/' + action;
      var response = this.http.get(url).map(res => res.json());
      return response;
  }
}
