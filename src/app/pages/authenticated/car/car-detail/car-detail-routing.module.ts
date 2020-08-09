import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CarDetailComponent } from './car-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CarDetailComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarDetailRoutingModule { }
