import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDetailRoutingModule } from './admin-detail-routing.module';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDetailComponent } from './admin-detail.component';
@NgModule({
  declarations: [
    AdminDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminDetailRoutingModule,
    SharedModule
  ]
})
export class AdminDetailModule { }
