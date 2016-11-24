import { RobotProvider } from '../providers//robot-provider';

export class Robot {
    robotType: any;
    robotIP: any;
    robotName: any;
    robotProvider: RobotProvider;

    constructor(robotType,robotIP, robotProvider){
        //TODO: implement constructor
        this.robotType = robotType;
        this.robotIP = robotIP;
        this.robotProvider = robotProvider;
    }

    talk(){
        //TODO: implement talk method
    }

    camera(){
        //TODO: implement camera method
    }

    getName(){
        this.robotProvider.getName(this.robotIP, this.robotType).subscribe(
            data => {
        this.robotName = data.name;
        console.log(this.robotName);
      },
      err => {
        console.log(err)
      });
      
  }

}
