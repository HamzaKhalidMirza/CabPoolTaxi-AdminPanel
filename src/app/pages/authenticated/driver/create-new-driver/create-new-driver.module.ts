import { CnicMaskDirective } from './../../../../../common/directive/cnic-mask.directive';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNewDriverComponent } from './create-new-driver.component';
import { CreateNewDriverRoutingModule } from './create-new-driver-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateNewDriverComponent,
    CnicMaskDirective
  ],
  imports: [
    CommonModule,
    CreateNewDriverRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CreateNewDriverModule { }
