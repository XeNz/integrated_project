import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class RobotListProvider {
    af: AngularFire;
    robotList: any[];
    
    constructor(af:AngularFire) {
        console.log('Hello RobotListProvider');
        this.af = af;
    }

    addRobotToList(userID, ip){
        let robotList = this.af.database.object(userID + '/robotList/');
        robotList.update({
            ip: ip
        });
    }
    
    getRobotList(user){
        
    }
}