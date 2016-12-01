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

    addRobotToList(user, ip){
        let robotList = this.af.database.object(user + '/robotList/');
        robotList.update({
            ip: ip
        });
    }
    
    getRobotList(user){
        
    }
}