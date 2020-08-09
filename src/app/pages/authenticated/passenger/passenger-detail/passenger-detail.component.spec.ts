import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerDetailComponent } from './passenger-detail.component';

describe('AdminsRecordComponent', () => {
  let component: PassengerDetailComponent;
  let fixture: ComponentFixture<PassengerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
