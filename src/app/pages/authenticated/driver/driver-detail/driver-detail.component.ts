import { DriverService } from 'src/common/sdk/custom/api/drivers.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/common/sdk/core/auth.service';
import { CarService } from 'src/common/sdk/custom/api/cars.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AppError } from 'src/common/error/app-error';
import { BadInput } from 'src/common/error/bad-input';
import { NotFoundError } from 'src/common/error/not-found-error';
import { UnAuthorized } from 'src/common/error/unauthorized-error';
import { Subscription } from 'rxjs';
import { FirebaseImageHandler } from 'src/common/sdk/custom/api/firebase-image-handler.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.scss'],
})
export class DriverDetailComponent implements OnInit {
  updateLoading: any;
  loading: any;
  loadedData: any;
  form: FormGroup;
  formSubmitted: any;
  imageChanged: any;
  currentUser: any;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private driverService: DriverService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private firebaseImageHandler: FirebaseImageHandler
  ) {}

  async ngOnInit() {
    this.titleService.setTitle('Driver Detail | CabPoolTaxi');
    this.formInitializer();

    this.currentUser = await this.authService.getCurrentUser();

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
          this.form.patchValue({ username: this.loadedData.username });
          this.form.patchValue({ phone: this.loadedData.phone });
          this.form.patchValue({ email: this.loadedData.email });
          this.form.patchValue({ address: this.loadedData.address });
          this.form.patchValue({ photoAvatar: this.loadedData.photoAvatar });
        },
        (err) => {
          this.loading = false;
          console.log(err);
        }
      );
    });
  }

  formInitializer() {
    this.form = this.formBuilder.group({
      phone: [
        '',
        [
          Validators.required,
          Validators.min(1000000000),
          Validators.max(9999999999),
        ],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      photoAvatar: ['', [Validators.required]],
    });
  }

  onImagePicked(imageData: File) {
    this.form.patchValue({ photoAvatar: imageData });
    this.imageChanged = true;
    console.log(this.form);
  }

  async updateProfile() {
    this.updateLoading = true;
    this.formSubmitted = false;

    if (this.form.invalid) {
      return;
    }

    const uploadImgObs = await this.firebaseImageHandler.uploadProfileImg(
      this.form.value,
      'drivers'
    );
    uploadImgObs.subscribe(async (imgUrl) => {

      const updateSettingsObservable = await this.driverService.updateAccountSettings(
        this.loadedData.id,
        this.form.value,
        imgUrl
      );
      updateSettingsObservable.subscribe(
        async (response: any) => {
          this.form.reset();
          this.updateLoading = false;
          this.imageChanged = false;
          this.formSubmitted = true;

          this.loadedData = response.data.data;
          this.form.patchValue({ photoAvatar: this.loadedData.photoAvatar });
          this.form.patchValue({ username: this.loadedData.username });
          this.form.patchValue({ phone: this.loadedData.phone });
          this.form.patchValue({ email: this.loadedData.email });
          this.form.patchValue({ address: this.loadedData.address });
        },
        (error: AppError) => {
          if(this.imageChanged) {
            this.firebaseImageHandler.deleteImage(imgUrl);
          }
          this.updateLoading = false;
          console.log(error);
        }
      );
    }, (error) => {
      this.updateLoading = false;
      console.log(error);
    });
  }

  logout() {
    this.authService.logout();
  }
}
