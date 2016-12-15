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
    }

    //
    //https://codybonney.com/allow-cross-origin-resource-sharing-cors-using-flask/
    //
    signIn(robotIP) {
        var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/getType';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    getBatteryLevel(robotIP) {
        var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/getBatteryLevel';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    guessAge(robotIP) {
        var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/guessAge';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    getName(robotIP, robotType) {
        var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/getName/' + robotType;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    getType(robotIP) {
        var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/getType';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    ask(robotIP, text) {
        var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/ask/' + text;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    action(robotIP, action) {
        var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/actions/' + action;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    getActions(robotIP, robotType) {
        var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/getActions/' + robotType;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    // Doesn't work with virtual robot
    getVolume(robotIP) {
        var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/getVolume';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    move(robotIP, x, y, d) {
        var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/move/' + x + '/' + y + '/' + d;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
}
