import { Component, Input } from '@angular/core';
import { NameDetail} from '../entities/name-detail';

/**
 * child component shows name record details
 */
@Component({
  selector: 'name-detail',
  // template is defined directly in the component annotation
  template: `
    <div [hidden]="show">
      <h3>Details about {{nameDetail?.name}}</h3>
      <div>{{nameDetail?.about}}</div>
      <div><img src="{{nameDetail?.imageUrl}}"></div>
    </div>
    `
})
export class NameDetailComponent {
  /**
   * two inputs to this component directly used in the html template
   */
  @Input() nameDetail: NameDetail;
  @Input() show: boolean;

  constructor() {
  }
}