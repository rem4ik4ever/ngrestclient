import { Component, OnInit, ViewEncapsulation, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize/dist';

@Component({
  selector: 'app-incharge',
  templateUrl: './incharge.component.html',
  styleUrls: ['./incharge.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InchargeComponent implements OnInit {

  forgotPinModalActions = new EventEmitter<string|MaterializeAction>();

  constructor() { }

  ngOnInit() {
  }

  showForgotPinModal() {
    this.forgotPinModalActions.emit({action:"modal",params:['open']});
  }

  closeModalPin() {
    this.forgotPinModalActions.emit({action:"modal",params:['close']});
  }

}
