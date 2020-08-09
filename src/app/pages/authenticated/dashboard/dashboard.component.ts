import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/common/sdk/core/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(
    private titleService: Title,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Admin Dashboard | CabPoolTaxi');
  }

  logout() {
    this.authService.logout();
  }

}
