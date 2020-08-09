import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersRecordComponent } from './passengers-record.component';

describe('AdminsRecordComponent', () => {
  let component: PassengersRecordComponent;
  let fixture: ComponentFixture<PassengersRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengersRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengersRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
