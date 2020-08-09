import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreateNewAdminComponent } from './create-new-admin.component';

const routes: Routes = [
  {
    path: '',
    component: CreateNewAdminComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateNewAdminRoutingModule { }
