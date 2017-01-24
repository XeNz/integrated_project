import { Robot } from './robot';
import { RobotProvider } from '../providers/robot-provider';

export class Pepper extends Robot{
    constructor(robotType,robotIP,public robotProvider: RobotProvider){
        super(robotType,robotIP,robotProvider);
    }

    ride(){
        //TODO: implement ride
    }

    tablet(){
        //TODO: implement tablet
    }

    guessAge(){
        //TODO: implement guessAge
    }
}
