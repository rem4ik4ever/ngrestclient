import { Component, Input } from '@angular/core';

@Component({
  selector: 'name-detail',
  template: `
    <div [hidden]="show">
      <h3>Details about {{nameDetail?.name}}</h3>
      <div>{{nameDetail?.about}}</div>
      <div>{{nameDetail.imageUrl}}:<img src="{{nameDetail?.imageUrl}}"></div>
    </div>
    `
})
export class NameDetailComponent {
  @Input() nameDetail: NameDetailComponent;
  @Input() show: boolean;

  constructor() {
  }
}