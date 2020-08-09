import { AdminDetailRoutingModule } from './admin-detail-routing.module';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDetailComponent } from './Admin-detail.component';
@NgModule({
  declarations: [
    AdminDetailComponent,
  ],
  imports: [
    CommonModule,
    AdminDetailRoutingModule,
    SharedModule
  ]
})
export class AdminDetailModule { }
