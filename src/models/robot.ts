import { RobotProvider } from '../providers//robot-provider';

export class Robot {
    robotType: any;
    robotIP: any;
    robotName: any;
    robotProvider: RobotProvider;
    batteryLevel: any;
    actions: any;
    postureActions: any
    age: number;
    volume: number;

    constructor(robotType, robotIP, robotProvider) {
        this.robotType = robotType;
        this.robotIP = robotIP;
        this.robotProvider = robotProvider;
    }

    camera() {
        // Only on physical robot.
    }

    getName() {
        this.robotProvider.getName(this.robotIP, this.robotType).subscribe(
            data => {
                this.robotName = data.name;
            },
            err => {
                console.log(err)
            });

    }

    checkBatteryLevel() {
        //http://www.gajotres.net/ionic-2-making-rest-http-requests-like-a-pro/
        this.robotProvider.getBatteryLevel(this.robotIP).subscribe(
            data => {
                this.batteryLevel = data.level;
            },
            err => {
                console.log(err)
            });
    }


    repeatCheckBatteryLevel() {
        setInterval(() => {
            this.checkBatteryLevel();
        }, 30000);
    }

    ask(text) {
        //http://www.gajotres.net/ionic-2-making-rest-http-requests-like-a-pro/
        this.robotProvider.ask(this.robotIP, text).subscribe(
            data => {
                console.log(data.text);
            },
            err => {
                console.log(err);
            });
    }

    action(action) {
        this.robotProvider.action(this.robotIP, action).subscribe(
            data => {
                console.log(data.posture);
            },
            err => {
                console.log(err);
            });
    }

    getActions() {
        this.robotProvider.getActions(this.robotIP, this.robotType).subscribe(
            data => {
                this.actions = data.actions;
                this.postureActions = data.postureActions;
            },
            err => {
                console.log(err);
            });
    }

    guessAge() {
        this.robotProvider.guessAge(this.robotIP).subscribe(
            data => {
                this.age = data.age;
            },
            err => {
                console.log(err);
            });
    }

    getVolume() {
        this.robotProvider.getVolume(this.robotIP).subscribe(
            data => {
                this.volume = data.volume;
            },
            err => {
                console.log(err);
            });
    }

    move(moveCoordinateX, moveCoordinateY, moveCoordinateD) {
        this.robotProvider.move(this.robotIP, moveCoordinateX, moveCoordinateY, moveCoordinateD).subscribe(
            data => {
                console.log(data);
            },
            err => {
                console.log(err);
            });
    }
}
