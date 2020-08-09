import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewDriverComponent } from './create-new-driver.component';

describe('AdminsRecordComponent', () => {
  let component: CreateNewDriverComponent;
  let fixture: ComponentFixture<CreateNewDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
