import { AdminService } from './../../../../../common/sdk/custom/api/admins.service';
import { Component, OnInit, ViewChild, ElementRef, Type } from '@angular/core';
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
  deleteLoading: any;
  loadedData: any;
  currentUser: any;
  showDeleteModal: any = false;

  deletedUser: any;
  @ViewChild('deletionModal') deletionModal: ElementRef;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Admins Record | CabPoolTaxi');
    this.currentUser = this.authService.getCurrentUser();

    this.loading = true;
    this.getAllAdmins();
  }

  async getAllAdmins() {
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

  openDeletedUserModal(admin) {
    this.deletedUser = admin;
    this.showDeleteModal = true;
  }

  closeDeleteUserModal() {
    this.showDeleteModal = false;
  }

  async deleteAdmin() {
    if(!this.deletedUser) {
      return;
    }
    if(this.deletedUser.id === this.currentUser.id) {
      this.showDeleteModal = false;
      return;
    }
    this.deleteLoading = true;

    const obs = await this.adminService.deleteAdmin({id: this.deletedUser.id})
    obs.subscribe(
      (data) => {
        this.deleteLoading = false;
        this.showDeleteModal = false;
        this.getAllAdmins();
        console.log(data);
      }, (error) => {
        this.deleteLoading = false;
        this.showDeleteModal = false;
        console.log(error);
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
