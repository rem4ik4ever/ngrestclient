import { MaterializeAction } from 'angular2-materialize/dist';
import { MaterializeDirective } from 'angular2-materialize/dist/materialize-directive';
import { Subscription } from 'rxjs/Rx';
import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { PhoneLocker } from './phone-locker';
import { Observable } from 'rxjs';
import { RequestOptions, Http, Headers } from '@angular/http';
import { LockerSession } from '../models/locker-session';
import { LockerUser } from '../models/locker-user';

@Component({
  selector: 'app-phone-locker',
  templateUrl: './phone-locker.component.html',
  styleUrls: ['./phone-locker.component.css']
})
export class PhoneLockerComponent {

  private counter: Observable<number>;
  private locking: Observable<Boolean>;
  private subscription: Subscription;
  private lockedSubscription: Subscription;
  private lockerSession: LockerSession;

  actions = new EventEmitter<string|MaterializeAction>();

  userName: String;

  timeElapsed: number;
  @Input() locker: PhoneLocker;

  constructor(private http: Http) { }

  ngOnInit() {
    this.locker.isOpen = true;
    this.locker.status = 'Open';
  }

  occupyLocker() {
    if(!this.userName){
      this.actions.emit('toast');
      console.log("showing toast");
    } else {
      this.locker.isOpen = false;
      this.locker.status = 'Locked';

      this.lockerSession = new LockerSession(new Date(), "Rem Kim");

      this.counter = Observable.interval(1000).map((x) => {
        return new Date().getTime();
      });
      this.locking = Observable.interval(1000).map((x) => {
        return this.locker.isOpen;
      });

      this.lockedSubscription = this.locking.subscribe((x) => this.locker.isOpen);

      this.subscription = this.counter.subscribe((x) => this.timeElapsed = this.calculateTime());
      // this.startSession();
    }
  }
  unlockLocker() {
    this.locker.isOpen = true;
    this.locker.status = 'Open';
    this.lockerSession.timeEnded = new Date();
    this.subscription.unsubscribe();
    this.lockedSubscription.unsubscribe();
    // this.finishSession();
  }

  calculateTime() {
    return Math.round((new Date().getTime() - this.lockerSession.timeStarted.getTime()) / 1000);
  }

  showElapsedTime(seconds) {
    let hours, minutes;

    hours = Math.round(seconds / (60 * 60));

    minutes = Math.round(seconds / (60));

    let date = [
        (hours > 0 ? hours + ' hrs :' : '') , 
        (minutes > 0 ? minutes % 60 + ' min :' : '') , 
        (seconds > 0 ? seconds % 60 + ' sec' : '')
      ].join(' ');
    return date;
  }

  startSession() {
    let url = "http://localhost:8080/locker/"+ this.locker.id + "/occupy"
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.put(url, JSON.stringify(this.lockerSession),  options)
    .map(resp => resp.json())
    .subscribe(
        (response) => {
            console.log('session started', response);
        }
    )
  }

  finishSession() {
    let url = "http://localhost:8080/locker/"+ this.locker.id + "/unlock"
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.put(url, JSON.stringify(this.lockerSession),  options)
    .map(resp => resp.json())
    .subscribe(
        (response) => {
            console.log('session started', response);
        }
    )
  }


}
