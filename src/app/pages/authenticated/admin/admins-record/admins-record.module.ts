import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsRecordComponent } from './admins-record.component';
import { AdminsRecordRoutingModule } from './admins-record-routing.module';

@NgModule({
  declarations: [
    AdminsRecordComponent,
  ],
  imports: [
    CommonModule,
    AdminsRecordRoutingModule,
    SharedModule
  ]
})
export class AdminsRecordModule { }
