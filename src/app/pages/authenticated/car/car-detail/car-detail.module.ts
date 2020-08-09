import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarDetailComponent } from './car-detail.component';
import { CarDetailRoutingModule } from './car-detail-routing.module';

@NgModule({
  declarations: [
    CarDetailComponent,
  ],
  imports: [
    CommonModule,
    CarDetailRoutingModule,
    SharedModule
  ]
})
export class CarDetailModule { }
