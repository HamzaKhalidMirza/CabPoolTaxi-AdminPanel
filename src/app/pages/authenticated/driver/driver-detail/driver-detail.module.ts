import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverDetailComponent } from './driver-detail.component';
import { DriverDetailRoutingModule } from './driver-detail-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DriverDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DriverDetailRoutingModule,
    SharedModule
  ]
})
export class DriverDetailModule { }
