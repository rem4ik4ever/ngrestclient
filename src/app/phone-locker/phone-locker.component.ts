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
  private tmpEndTime: any;
  private tmpCost: String;

  pinCode: String;

  actions = new EventEmitter<string|MaterializeAction>();
  toastActions = new EventEmitter<string|MaterializeAction>();
  occupyActions = new EventEmitter<string|MaterializeAction>();

  userName: String;

  timeElapsed: number;
  @Input() locker: PhoneLocker;

  constructor(private http: Http) { }

  ngOnInit() {
    if(this.locker.currentSession){
      this.lockerSession = this.locker.currentSession;
      this.userName = this.lockerSession.userName;
      this.locker.status = 'Locked';
      this.startObservers();
      console.log('has current session', this.lockerSession);
    } else {
      this.locker.isOpen = true;
      this.locker.status = 'Open';
      this.lockerSession = new LockerSession(null, null);
    }
  }

  private startObservers() {
    this.counter = Observable.interval(1000).map((x) => {
        return new Date().getTime();
      });
      this.locking = Observable.interval(1000).map((x) => {
        return this.locker.isOpen;
      });

      this.lockedSubscription = this.locking.subscribe((x) => this.locker.isOpen);

      this.subscription = this.counter.subscribe((x) => 
        this.timeElapsed = this.calculateTime(new Date().getTime()));
  }

  occupyLocker() {
    if(!this.userName){
      this.toastActions.emit({action: 'toast', params: ['Name is required', 2000]});
      console.log("showing toast");
    } else {
      this.locker.isOpen = false;
      this.locker.status = 'Locked';
      this.startObservers();
      this.lockerSession = new LockerSession(new Date().getTime(), this.userName);
      console.log('Saving date', this.lockerSession.timeStarted)
      
      this.startSession();
    }
  }
  unlockLocker(endTime: number, cost: String) {
    this.locker.isOpen = true;
    this.locker.status = 'Open';
    this.lockerSession.timeEnded = endTime;
    this.lockerSession.cost = cost;
    this.subscription.unsubscribe();
    this.lockedSubscription.unsubscribe();

    console.log('Finishing session', this.lockerSession);
    
    this.finishSession();
  }

  calculateTime(endTime:number) {
    return Math.round((endTime - this.lockerSession.timeStarted) / 1000);
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
    let url = "http://localhost:8080/locker/"+ this.locker.id + "/occupy";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.put(url, JSON.stringify(this.lockerSession),  options)
    .map(resp => resp.json())
    .subscribe(
        (response) => {
            this.lockerSession = response;
            console.log('session started', this.lockerSession);
            this.occupyActions.emit({action:"modal",params:['open']});
        }
    )
  }

  finishSession() {
    let url = "http://localhost:8080/locker/"+ this.locker.id + "/unlock/" + this.lockerSession.id;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.put(url, JSON.stringify(this.lockerSession),  options)
    .map(resp => resp.json())
    .subscribe(
        (response) => {
            this.lockerSession = response;
            console.info(`Session results: `, this.lockerSession);
        }
    )
  }

  model1Params = [
    {
      dismissible: false,
      complete: function() { console.log('Closed'); }
    }
  ]

  openModal1() {
    this.tmpEndTime = new Date().getTime();
    this.tmpCost = (this.calculateTime(this.tmpEndTime) / 60 * 0.75).toFixed(2);

    this.actions.emit({action:"modal",params:['open']});
  }
  closeModal1() {
    this.actions.emit({action:"modal",params:['close']});
  }

  closeModal2() {
    this.occupyActions.emit({action:"modal",params:['close']});
  }

  pay(){
    if(!this.pinCode){
      this.toastActions.emit({action: 'toast', params: ['Pin is required', 2000]});
    }
    if(this.pinCode === this.lockerSession.pin.toString()){
      this.actions.emit({action:"modal",params:['close']});
      this.unlockLocker(this.tmpEndTime, this.tmpCost);
      this.userName = '';
    } else {
      this.toastActions.emit({action: 'toast', params: ['Incorrect PIN code', 2000]});
    }
  }

  


}
