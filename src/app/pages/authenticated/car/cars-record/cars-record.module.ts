import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsRecordComponent } from './cars-record.component';
import { CarsRecordRoutingModule } from './cars-record-routing.module';

@NgModule({
  declarations: [
    CarsRecordComponent,
  ],
  imports: [
    CommonModule,
    CarsRecordRoutingModule,
    SharedModule
  ]
})
export class CarsRecordModule { }
