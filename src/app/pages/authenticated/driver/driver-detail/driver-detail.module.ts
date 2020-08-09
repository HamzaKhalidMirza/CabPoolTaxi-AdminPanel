import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverDetailComponent } from './driver-detail.component';
import { DriverDetailRoutingModule } from './driver-detail-routing.module';

@NgModule({
  declarations: [
    DriverDetailComponent,
  ],
  imports: [
    CommonModule,
    DriverDetailRoutingModule,
    SharedModule
  ]
})
export class DriverDetailModule { }
