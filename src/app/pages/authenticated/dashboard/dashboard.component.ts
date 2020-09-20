import { AdminService } from 'src/common/sdk/custom/api/admins.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/common/sdk/core/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loading: any;
  loadedData: any;

  driversCount: any;
  clientsCount: any;
  monthlyPaymentData: any;
  yearlyPaymentData: any;
  monthlyEarning: any = 0;
  yearlyEarning: any = 0;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  async ngOnInit() {
    this.titleService.setTitle('Admin Dashboard | CabPoolTaxi');

    this.loading = true;
    const obs = await this.adminService.getDashboardData();
    obs.subscribe(
      (response: any) => {
        this.loading = false;
        this.loadedData = response.data;
        this.driversCount = this.loadedData.driversCount;
        this.clientsCount = this.loadedData.clientsCount;
        this.monthlyPaymentData = this.loadedData.monthlyPaymentData;
        this.yearlyPaymentData = this.loadedData.yearlyPaymentData;

        this.monthlyPaymentData.forEach(element => {
          this.monthlyEarning += element.totalPaid;
        });
        this.yearlyPaymentData.forEach(element => {
          this.yearlyEarning += element.totalPaid;
        });
      },
      (err) => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  logout() {
    this.authService.logout();
  }

}
