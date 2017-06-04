import { Component, Input } from '@angular/core';
import { NameDetail} from '../entities/name-detail';

@Component({
  selector: 'name-detail',
  template: `
    <div [hidden]="show">
      <h3>Details about {{nameDetail?.name}}</h3>
      <div>{{nameDetail?.about}}</div>
      <div><img src="{{nameDetail?.imageUrl}}"></div>
    </div>
    `
})
export class NameDetailComponent {
  @Input() nameDetail: NameDetail;
  @Input() show: boolean;

  constructor() {
  }
}