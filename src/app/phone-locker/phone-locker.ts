import { LockerSession } from '../models/locker-session';
export class PhoneLocker {
  id: Number;
  isOpen: Boolean;
  userName: String;
  status: String;
  currentSession: LockerSession;
}
