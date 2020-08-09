import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CarsRecordComponent } from './cars-record.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CarsRecordComponent,
      },
      {
        path: ':carId',
        loadChildren: () => import('./../car-detail/car-detail.module').then( m => m.CarDetailModule)
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRecordRoutingModule { }
