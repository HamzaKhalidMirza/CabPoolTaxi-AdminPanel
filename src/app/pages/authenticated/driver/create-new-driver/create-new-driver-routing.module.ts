import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreateNewDriverComponent } from './create-new-driver.component';

const routes: Routes = [
  {
    path: '',
    component: CreateNewDriverComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateNewDriverRoutingModule { }
