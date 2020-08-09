import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/common/sdk/core/auth.service';
import { DriverService } from 'src/common/sdk/custom/api/drivers.service';
declare let $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './drivers-record.component.html',
  styleUrls: ['./drivers-record.component.scss'],
})
export class DriversRecordComponent implements OnInit {
  loading: any;
  loadedData: any;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private driverService: DriverService
  ) {}

  async ngOnInit() {
    this.titleService.setTitle('Drivers Record | CabPoolTaxi');

    this.loading = true;
    const obs = await this.driverService.getAllDrivers();
    obs.subscribe(
      (response: any) => {
        this.loading = false;
        this.loadedData = response.data.data;
        console.log(this.loadedData);
        $(document).ready(function () {
          $('#dataTable').DataTable();
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
