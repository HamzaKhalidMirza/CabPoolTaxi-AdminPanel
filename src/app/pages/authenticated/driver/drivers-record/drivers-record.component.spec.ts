import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversRecordComponent } from './drivers-record.component';

describe('AdminsRecordComponent', () => {
  let component: DriversRecordComponent;
  let fixture: ComponentFixture<DriversRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriversRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
