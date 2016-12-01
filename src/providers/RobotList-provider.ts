import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class RobotListProvider {
    af: AngularFire;
    robotList: FirebaseListObservable<[any]>;
    
    constructor(af:AngularFire) {
        console.log('Hello RobotListProvider');
        this.af = af;
    }

    addRobotToList(userID, ip){
        let robotList = this.af.database.list(userID + '/robotList/');
        robotList.push({
            ip: ip
        });
    }
    
    getRobotList(userID){
        this.robotList = this.af.database.list(userID + '/robotList/');
        return this.robotList;
    }
}