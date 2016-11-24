import { Robot } from './robot';
import { RobotProvider } from '../providers/robot-provider';

export class Nao extends Robot{
    constructor(robotType,robotIP,public robotProvider: RobotProvider){
        //TODO: implement constructor
        super(robotType,robotIP,robotProvider);
    }

    walk(){
        //TODO: implement walk
    }
}
