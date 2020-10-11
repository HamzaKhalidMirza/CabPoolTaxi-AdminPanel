import { TopNavComponent } from 'src/app/shared/nav/top-nav/top-nav.component';
import { SideNavComponent } from 'src/app/shared/nav/side-nav/side-nav.component';
import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { RadarChartComponent } from './charts/radar-chart/radar-chart.component';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';
import { ChartsModule } from 'ng2-charts';
import { UsersChartComponent } from './charts/users-chart/users-chart.component';

@NgModule({
    declarations: [
      SideNavComponent,
      TopNavComponent,
      ImagePickerComponent,
      LineChartComponent,
      BarChartComponent,
      PieChartComponent,
      RadarChartComponent,
      DoughnutChartComponent,
      UsersChartComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ChartsModule
    ],
    exports: [
      SideNavComponent,
      TopNavComponent,
      ImagePickerComponent,
      LineChartComponent,
      BarChartComponent,
      PieChartComponent,
      RadarChartComponent,
      DoughnutChartComponent,
      UsersChartComponent
    ],
    entryComponents: [],
    providers: []
  })
  export class SharedModule {}
