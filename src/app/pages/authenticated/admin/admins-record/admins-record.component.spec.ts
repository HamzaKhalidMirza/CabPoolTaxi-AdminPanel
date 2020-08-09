import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsRecordComponent } from './admins-record.component';

describe('AdminsRecordComponent', () => {
  let component: AdminsRecordComponent;
  let fixture: ComponentFixture<AdminsRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
