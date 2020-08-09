import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriversRecordComponent } from './drivers-record.component';
import { DriversRecordRoutingModule } from './drivers-record-routing.module';

@NgModule({
  declarations: [
    DriversRecordComponent,
  ],
  imports: [
    CommonModule,
    DriversRecordRoutingModule,
    SharedModule
  ]
})
export class DriversRecordModule { }
