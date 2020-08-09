import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/common/sdk/core/auth.service';
import { CarService } from 'src/common/sdk/custom/api/cars.service';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/common/sdk/custom/api/admins.service';
declare let $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.scss'],
})
export class AdminDetailComponent implements OnInit {
  loading: any;
  loadedData: any;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.titleService.setTitle('Admin Detail | CabPoolTaxi');

    this.route.paramMap.subscribe(async (router) => {
      let adminId = router.get('adminId');
      this.loading = true;

      const obs = await this.adminService.getSingleAdmin({
        adminId: adminId,
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
