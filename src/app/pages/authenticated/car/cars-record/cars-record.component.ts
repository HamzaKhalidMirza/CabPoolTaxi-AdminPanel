import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/common/sdk/core/auth.service';
import { CarService } from 'src/common/sdk/custom/api/cars.service';
declare let $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './cars-record.component.html',
  styleUrls: ['./cars-record.component.scss'],
})
export class CarsRecordComponent implements OnInit {
  loading: any;
  loadedData: any;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private carService: CarService
  ) {}

  async ngOnInit() {
    this.titleService.setTitle('Cars Record | CabPoolTaxi');

    this.loading = true;
    const obs = await this.carService.getAllCars();
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
