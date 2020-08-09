import { IsLoginGuard } from './../common/sdk/custom/guards/islogin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedirectLoginGuard } from 'src/common/sdk/custom/guards/redirectlogin.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    canActivate: [RedirectLoginGuard],
    loadChildren: () =>
      import('./pages/auth/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'dashboard',
    canActivate: [IsLoginGuard],
    loadChildren: () =>
      import('./pages/authenticated/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'adminsRecord',
    canActivate: [IsLoginGuard],
    loadChildren: () =>
      import('./pages/authenticated/admin/admins-record/admins-record.module').then(
        (m) => m.AdminsRecordModule
      ),
  },
  {
    path: 'createNewAdmin',
    canActivate: [IsLoginGuard],
    loadChildren: () =>
      import('./pages/authenticated/admin/create-new-admin/create-new-admin.module').then(
        (m) => m.CreateNewAdminModule
      ),
  },
  {
    path: 'driversRecord',
    canActivate: [IsLoginGuard],
    loadChildren: () =>
      import('./pages/authenticated/driver/drivers-record/drivers-record.module').then(
        (m) => m.DriversRecordModule
      ),
  },
  {
    path: 'createNewDriver',
    canActivate: [IsLoginGuard],
    loadChildren: () =>
      import('./pages/authenticated/driver/create-new-driver/create-new-driver.module').then(
        (m) => m.CreateNewDriverModule
      ),
  },
  {
    path: 'passengersRecord',
    canActivate: [IsLoginGuard],
    loadChildren: () =>
      import('./pages/authenticated/passenger/passengers-record/passengers-record.module').then(
        (m) => m.PassengersRecordModule
      ),
  },
  {
    path: 'carsRecord',
    canActivate: [IsLoginGuard],
    loadChildren: () =>
      import('./pages/authenticated/car/cars-record/cars-record.module').then(
        (m) => m.CarsRecordModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
