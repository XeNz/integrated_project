import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class RobotListProvider {
    af: AngularFire;
    robotList: FirebaseListObservable<[any]>;

    constructor(af: AngularFire) {
        this.af = af;
    }

    addRobotToList(userID, ip, type) {
        let robotList = this.af.database.list(userID + '/robotList/');
        robotList.push({
            ip: ip,
            type: type
        });
    }

    getRobotList(userID) {
        this.robotList = this.af.database.list(userID + '/robotList/');
        return this.robotList;
    }
    deleteRobotIP(userID, robotIP, key) {
        //console.log("deleterobotip" + robotIP + " , " + userID);
        const queryObservable = this.af.database.list(userID + '/robotList/', {
            query: {
                orderByChild: 'ip',
                equalTo: robotIP
            }
        });
        // MAGIC ALERT
        // actually not even sure if query is needed, might only need key to remove
        queryObservable.remove(key);
        //console.log(queryObservable);
    }
    deleteUserData(userID){
        this.af.database.list(userID).remove();
    }
}