import { Robot } from './robot';
import { RobotProvider } from '../providers/robot-provider';

export class Jibo extends Robot{
    constructor(robotType,robotIP,public robotProvider: RobotProvider){
        super(robotType,robotIP,robotProvider);
    }

    moveHead(){
        //TODO: implement moveHead
    }

    display(){
        //TODO implement display
    }
}
