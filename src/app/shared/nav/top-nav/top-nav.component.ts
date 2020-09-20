import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/common/sdk/core/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  currentuser: any;
  loading: any;

  constructor(
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.loading = true;
    this.currentuser = await this.authService.getCurrentUser();
    this.loading = false;
  }

}
