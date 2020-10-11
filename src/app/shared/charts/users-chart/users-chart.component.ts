import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-users-chart',
  templateUrl: './users-chart.component.html',
  styleUrls: ['./users-chart.component.scss']
})
export class UsersChartComponent implements OnInit {

  @Input('admin') admins: any;
  @Input('driver') drivers: any;
  @Input('passenger') passengers: any;
  chartType: any;
  chartLabels: Label[];
  chartData: ChartDataSets[];
  chartOptions: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.chartType = 'doughnut';
    this.chartLabels = ["Admins", "Divers", "Passengers"];
    this.chartData = [
      {
        data: [this.admins, this.drivers, this.passengers],
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
        hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
        hoverBorderColor: "rgba(234, 236, 244, 1)"
      }
    ];
    this.chartOptions = {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 0,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      layout: {
        padding: {
          left: 30,
          right: 30,
          top: 0,
          bottom: 0
        }
      },
      cutoutPercentage: 80
    };
  }

}
