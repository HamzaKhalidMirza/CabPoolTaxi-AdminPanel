import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DriversRecordComponent } from './drivers-record.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DriversRecordComponent,
      },
      {
        path: ':driverId',
        loadChildren: () => import('./../driver-detail/driver-detail.module').then( m => m.DriverDetailModule)
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriversRecordRoutingModule { }
