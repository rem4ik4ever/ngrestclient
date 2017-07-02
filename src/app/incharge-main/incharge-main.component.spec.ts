import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InchargeMainComponent } from './incharge-main.component';

describe('InchargeMainComponent', () => {
  let component: InchargeMainComponent;
  let fixture: ComponentFixture<InchargeMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InchargeMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InchargeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
