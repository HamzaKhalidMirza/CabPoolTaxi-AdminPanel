import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/common/sdk/core/auth.service';
import { CarService } from 'src/common/sdk/custom/api/cars.service';
import { ActivatedRoute } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
})
export class CarDetailComponent implements OnInit {
  loading: any;
  loadedData: any;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private carService: CarService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.titleService.setTitle('Car Detail | CabPoolTaxi');

    this.route.paramMap.subscribe(async (router) => {
      let carId = router.get('carId');
      this.loading = true;

      const obs = await this.carService.getSingleCar({
        carId: carId,
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
