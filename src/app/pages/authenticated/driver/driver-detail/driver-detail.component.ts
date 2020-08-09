import { DriverService } from 'src/common/sdk/custom/api/drivers.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/common/sdk/core/auth.service';
import { CarService } from 'src/common/sdk/custom/api/cars.service';
import { ActivatedRoute } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.scss'],
})
export class DriverDetailComponent implements OnInit {
  loading: any;
  loadedData: any;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private driverService: DriverService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.titleService.setTitle('Driver Detail | CabPoolTaxi');

    this.route.paramMap.subscribe(async (router) => {
      let driverId = router.get('driverId');
      this.loading = true;

      const obs = await this.driverService.getSingleDriver({
        driverId: driverId,
      });
      obs.subscribe(
        (response: any) => {
          this.loading = false;
          this.loadedData = response.data.data;
          console.log(this.loadedData);
        },
        (err) => {
          this.loading = false;
          console.log(err);
        }
      );
    });
  }

  logout() {
    this.authService.logout();
  }
}
