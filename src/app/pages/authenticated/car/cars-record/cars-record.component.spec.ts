import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsRecordComponent } from './cars-record.component';

describe('AdminsRecordComponent', () => {
  let component: CarsRecordComponent;
  let fixture: ComponentFixture<CarsRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
