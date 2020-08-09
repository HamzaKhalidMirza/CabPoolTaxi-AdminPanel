import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminsRecordComponent } from './admins-record.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AdminsRecordComponent,
      },
      {
        path: ':adminId',
        loadChildren: () => import('./../admin-detail/admin-detail.module').then( m => m.AdminDetailModule)
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRecordRoutingModule { }
