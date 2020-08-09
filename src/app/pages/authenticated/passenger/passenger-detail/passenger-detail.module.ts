import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengerDetailComponent } from './passenger-detail.component';
import { PassengerDetailRoutingModule } from './passenger-detail-routing.module';

@NgModule({
  declarations: [
    PassengerDetailComponent,
  ],
  imports: [
    CommonModule,
    PassengerDetailRoutingModule,
    SharedModule
  ]
})
export class PassengerDetailModule { }
