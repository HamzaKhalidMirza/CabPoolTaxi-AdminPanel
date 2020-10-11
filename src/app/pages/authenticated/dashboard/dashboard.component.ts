import { AdminService } from 'src/common/sdk/custom/api/admins.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/common/sdk/core/auth.service';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loading: any;
  loadedData: any;

  adminsCount: any;
  driversCount: any;
  clientsCount: any;
  yearlyPaymentData: any;
  yearlyEarning: any = 0;
  monthlyEarning: any = [];
  monthlyAdmin: any = [];
  monthlyDriver: any = [];
  monthlyPassenger: any = [];

  earningChart: any;
  usersChart: any;
  selectedChartUser: any;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  async ngOnInit() {
    this.titleService.setTitle('Admin Dashboard | CabPoolTaxi');
    this.earningChart = {
      title: 'LineChart',
      label: "Earnings",
      data: []
    };
    this.selectedChartUser = 'Admin';
    this.usersChart = {
      title: 'LineChart',
      label: "Admins",
      data: []
    };

    this.loading = true;
    const obs = await this.adminService.getDashboardData();
    obs.subscribe(
      (response: any) => {
        this.loading = false;
        this.loadedData = response.data;
        this.adminsCount = this.loadedData.adminsCount;
        this.driversCount = this.loadedData.driversCount;
        this.clientsCount = this.loadedData.clientsCount;
        this.yearlyPaymentData = this.loadedData.yearlyPaymentData;
        this.yearlyPaymentData.forEach(element => {
          this.yearlyEarning += element.totalPaid;
        });
        this.monthlyEarning = this.loadedData.monthlyEarnings;
        this.monthlyAdmin = this.loadedData.monthlyAdmins;
        this.monthlyDriver = this.loadedData.monthlyDrivers;
        this.monthlyPassenger = this.loadedData.monthlyPassengers;
        console.log(this.loadedData);

        this.earningChart.data = this.monthlyEarning;
        this.usersChart.data = this.monthlyAdmin;
      },
      (err) => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  getCurrentMonthEarnings() {
    let currentMonth = new Date().getMonth();
    return this.monthlyEarning[currentMonth];
  }

  toggleChart(chartType, chart) {
    if(chartType === 'Line') {
      chart.title = 'LineChart';
    } else if(chartType === 'Bar') {
      chart.title = 'BarChart';
    } else if(chartType === 'Radar') {
      chart.title = 'RadarChart';
    } else if(chartType === 'Pie') {
      chart.title = 'PieChart';
    } else if(chartType === 'Doughnut') {
      chart.title = 'DoughnutChart';
    }
  }

  toggleChartUser(user) {
    this.selectedChartUser = user;

    if(user === 'Admin') {
      const title = this.usersChart.title;
      this.usersChart = {
        title: title,
        label: 'Admins',
        data: this.monthlyAdmin
      }
    } else if(user === 'Driver') {
      const title = this.usersChart.title;
      this.usersChart = {
        title: title,
        label: 'Drivers',
        data: this.monthlyDriver
      }
    } else if(user === 'Passenger') {
      const title = this.usersChart.title;
      this.usersChart = {
        title: title,
        label: 'Passengers',
        data: this.monthlyPassenger
      }
    }
  }

  logout() {
    this.authService.logout();
  }

}
