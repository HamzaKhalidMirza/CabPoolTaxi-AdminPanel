import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PassengerDetailComponent } from './passenger-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PassengerDetailComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassengerDetailRoutingModule { }
