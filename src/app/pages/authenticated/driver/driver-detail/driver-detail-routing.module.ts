import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DriverDetailComponent } from './driver-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DriverDetailComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverDetailRoutingModule { }
