import { AdminService } from './../../../../../common/sdk/custom/api/admins.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/common/sdk/core/auth.service';
declare let $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './admins-record.component.html',
  styleUrls: ['./admins-record.component.scss'],
})
export class AdminsRecordComponent implements OnInit {
  loading: any;
  loadedData: any;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  async ngOnInit() {
    this.titleService.setTitle('Admins Record | CabPoolTaxi');

    this.loading = true;
    const obs = await this.adminService.getAllAdmins();
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
