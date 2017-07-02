
import { LockerUser } from './locker-user';

export class LockerSession {
  id: Number;
  timeStarted: Date;
  timeEnded: Date;
  userName: String;
  cost: Number;

  constructor(startDate: Date, userName: String){
    this.timeStarted = startDate;
    this.userName = userName;
  }

  finishSession() {
    this.timeEnded = new Date();
  }
}
