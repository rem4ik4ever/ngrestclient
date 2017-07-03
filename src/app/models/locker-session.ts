
import { LockerUser } from './locker-user';

export class LockerSession {
  id: number;
  timeStarted: number;
  timeEnded: number;
  userName: String;
  cost: String;
  pin: String;

  constructor(startDate: number, userName: String){
    this.timeStarted = startDate;
    this.userName = userName;
  }
}
