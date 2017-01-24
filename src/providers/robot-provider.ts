import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';

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

    // Returns the battery level of the robot
    getBatteryLevel(robotIP) {
        var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/getBatteryLevel';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    // Returns a random age
    guessAge(robotIP) {
        var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/guessAge';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    // Returns the robot name of the given robotType
    getName(robotIP, robotType) {
        var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/getName/' + robotType;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
    
    // Returns the type of the given robotIP
    // Is a random generated number at the moment
    getType(robotIP) {
        var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/getType';
        var response = this.http.get(url).timeout(3000).map(res => res.json());
        return response;
    }

    // Executes the ask action with the given text
    ask(robotIP, text) {
        var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/ask/' + text;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
    
    // Executes the given action
    action(robotIP, action) {
        var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/actions/' + action;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    // Returns a list of all actions of the given robotType
    getActions(robotIP, robotType) {
        var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/getActions/' + robotType;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    // Doesn't work with virtual robot
    // Should return the output volume of the robot
    getVolume(robotIP) {
        var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/getVolume';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    // Moves the robot useing the x, y, d coordinates
    move(robotIP, x, y, d) {
        var url = 'http://' + encodeURI(robotIP) + this.robotPort + '/move/' + x + '/' + y + '/' + d;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
}
