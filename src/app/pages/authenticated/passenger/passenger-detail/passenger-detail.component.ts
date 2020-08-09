import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/common/sdk/core/auth.service';
import { CarService } from 'src/common/sdk/custom/api/cars.service';
import { ActivatedRoute } from '@angular/router';
import { PassengerService } from 'src/common/sdk/custom/api/passengers.service';
declare let $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './passenger-detail.component.html',
  styleUrls: ['./passenger-detail.component.scss'],
})
export class PassengerDetailComponent implements OnInit {
  loading: any;
  loadedData: any;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private passengerService: PassengerService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.titleService.setTitle('Passenger Detail | CabPoolTaxi');

    this.route.paramMap.subscribe(async (router) => {
      let passengerId = router.get('passengerId');
      this.loading = true;

      const obs = await this.passengerService.getSinglePassenger({
        passengerId: passengerId,
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
