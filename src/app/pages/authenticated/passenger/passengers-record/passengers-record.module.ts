import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengersRecordComponent } from './passengers-record.component';
import { PassengersRecordRoutingModule } from './passengers-record-routing.module';

@NgModule({
  declarations: [
    PassengersRecordComponent,
  ],
  imports: [
    CommonModule,
    PassengersRecordRoutingModule,
    SharedModule
  ]
})
export class PassengersRecordModule { }
