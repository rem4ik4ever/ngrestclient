import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneLockerComponent } from './phone-locker.component';

describe('PhoneLockerComponent', () => {
  let component: PhoneLockerComponent;
  let fixture: ComponentFixture<PhoneLockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneLockerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneLockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
