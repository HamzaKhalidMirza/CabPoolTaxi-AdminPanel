import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNewAdminComponent } from './create-new-admin.component';
import { CreateNewAdminRoutingModule } from './create-new-admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateNewAdminComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateNewAdminRoutingModule,
  ]
})
export class CreateNewAdminModule { }
