import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminDetailComponent } from './admin-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDetailComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDetailRoutingModule { }
