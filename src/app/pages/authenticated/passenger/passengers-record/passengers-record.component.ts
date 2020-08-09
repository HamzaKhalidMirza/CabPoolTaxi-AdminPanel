import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/common/sdk/core/auth.service';
import { PassengerService } from 'src/common/sdk/custom/api/passengers.service';
declare let $: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './passengers-record.component.html',
  styleUrls: ['./passengers-record.component.scss'],
})
export class PassengersRecordComponent implements OnInit {
  loading: any;
  loadedData: any;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private passengerService: PassengerService
  ) {}

  async ngOnInit() {
    this.titleService.setTitle('Passengers Record | CabPoolTaxi');

    this.loading = true;
    const obs = await this.passengerService.getAllPassengers();
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
