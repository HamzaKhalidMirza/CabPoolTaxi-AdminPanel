import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PassengersRecordComponent } from './passengers-record.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PassengersRecordComponent,
      },
      {
        path: ':passengerId',
        loadChildren: () => import('./../passenger-detail/passenger-detail.module').then( m => m.PassengerDetailModule)
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassengersRecordRoutingModule { }
