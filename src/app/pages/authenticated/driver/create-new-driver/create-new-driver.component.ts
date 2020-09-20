import { CnicService } from './../../../../../common/sdk/custom/api/cnic.service';
import { CnicValidator } from './../../../../../common/validator/cnic.validator';
import { CarService } from 'src/common/sdk/custom/api/cars.service';
import { DriverService } from 'src/common/sdk/custom/api/drivers.service';
import { AdminService } from './../../../../../common/sdk/custom/api/admins.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AppError } from 'src/common/error/app-error';
import { BadInput } from 'src/common/error/bad-input';
import { AuthService } from 'src/common/sdk/core/auth.service';
import { NotFoundError } from 'src/common/error/not-found-error';
import { UnAuthorized } from 'src/common/error/unauthorized-error';
import { Subscription } from 'rxjs';
import { FirebaseImageHandler } from 'src/common/sdk/custom/api/firebase-image-handler.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './create-new-driver.component.html',
  styleUrls: ['./create-new-driver.component.scss'],
})
export class CreateNewDriverComponent implements OnInit {
  createDriverForm: FormGroup;
  sendCodeLoading: any = false;
  confirmCodeLoading: any = false;
  createDriverLoading: any = false;
  resendStatus: any;

  @ViewChild('phoneView') phoneView: any;
  @ViewChild('codeView') codeView: any;
  @ViewChild('passwordView') passwordView: any;
  @ViewChild('confPasswordView') confPasswordView: any;
  @ViewChild('cnicView') cnicView: AbstractControl;

  phoneExists: any;
  emailExists: any;
  cnicExists: any;
  licenseExists: any;
  registrationExists: any;

  formInvalid: any;
  formSubmitted: any;
  phoneInvalid: any;
  codeInvalid: any;
  usernameInvalid: any;
  emailInvalid: any;
  genderInvalid: any;
  roleInvalid: any;
  passwordInvalid: any;
  confPasswordInvalid: any;
  cnicInvalid: any;
  licensedInvalid: any;
  addressInvalid: any;

  fieldEnable: any = false;
  codeSent: any;
  codeResent: any;
  codeVerified: any;
  codeNotVerified: any;
  changeNumber: any;
  maxAttempts: any;

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private driverServide: DriverService,
    private carService: CarService,
    private firebaseImageHandler: FirebaseImageHandler,
    private authService: AuthService,
    private cnicService: CnicService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Create New Admin | CabPoolTaxi');
    this.formInitializer();
  }

  ngAfterViewInit() {
    this.codeView.nativeElement.disabled = true;
  }

  formInitializer() {
    this.createDriverForm = this.formBuilder.group({
      phone: [
        '',
        [
          Validators.required,
          Validators.min(1000000000),
          Validators.max(9999999999),
        ],
      ],
      code: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(4)],
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
      nationality: [''],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      role: ['driver'],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      confPassword: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          this.matchOtherValidator('password'),
        ],
      ],
      photoAvatar: ['', [Validators.required]],
      cnicNo: [
        '',
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(15)],
          [CnicValidator.shouldBeValid(this.cnicService)
        ],
      ],
      licenseNo: ['', [Validators.required]],
      address: ['', [Validators.required]],
      vehicleAvatar: ['', [Validators.required]],
      modelName: ['', [Validators.required]],
      totalSeats: ['', [Validators.required, Validators.min(1)]],
      registrationNo: ['', [Validators.required]],
      color: ['', [Validators.required]],
      ac: ['', [Validators.required]],
      type: ['', [Validators.required]],
      description: [''],
      driver: [''],
    });
    this.createDriverForm.reset();
    this.createDriverForm.patchValue({ role: 'driver' });
  }

  matchOtherValidator(otherControlName: string) {
    return (control: AbstractControl): { [key: string]: any } => {
      const otherControl: AbstractControl = control.root.get(otherControlName);

      if (otherControl) {
        const subscription: Subscription = otherControl.valueChanges.subscribe(
          () => {
            control.updateValueAndValidity();
            subscription.unsubscribe();
          }
        );
      }

      return otherControl && control.value !== otherControl.value
        ? { match: true }
        : null;
    };
  }

  get FormContols() {
    return this.createDriverForm.controls;
  }

  get phone() {
    return this.createDriverForm.get('phone');
  }
  get code() {
    return this.createDriverForm.get('code');
  }
  get cnic() {
    return this.createDriverForm.get('cnicNo');
  }

  togglePasswordType() {
    if (this.passwordView.nativeElement.type === 'password') {
      this.passwordView.nativeElement.type = 'text';
    } else {
      this.passwordView.nativeElement.type = 'password';
    }
  }

  toggleConfirmPasswordType() {
    if (this.confPasswordView.nativeElement.type === 'password') {
      this.confPasswordView.nativeElement.type = 'text';
    } else {
      this.confPasswordView.nativeElement.type = 'password';
    }
  }

  onImagePicked(imageData: File) {
    this.createDriverForm.patchValue({ photoAvatar: imageData });
    console.log(this.createDriverForm);
  }

  onVehicleImagePicked(imageData: File) {
    this.createDriverForm.patchValue({ vehicleAvatar: imageData });
    console.log(this.createDriverForm);
  }

  async sendCode() {
    this.fieldEnable = false;
    this.codeSent = false;
    this.codeResent = false;
    this.codeVerified = false;
    this.codeNotVerified = false;
    this.changeNumber = false;
    this.maxAttempts = false;
    this.phoneExists = false;
    this.emailExists = false;
    this.cnicExists = false;
    this.licenseExists = false;
    this.registrationExists = false;
    this.sendCodeLoading = true;
    this.formInvalid = false;
    this.formSubmitted = false;

    if (this.phone.errors) {
      this.phoneView.nativeElement.classList.add('is-invalid');
      this.phoneInvalid = true;
      return;
    }
    this.phoneView.nativeElement.classList.remove('is-invalid');
    this.phoneInvalid = false;

    this.getCode();
  }

  async resendCode() {
    this.fieldEnable = false;
    this.codeSent = false;
    this.codeResent = false;
    this.codeVerified = false;
    this.codeNotVerified = false;
    this.changeNumber = false;
    this.maxAttempts = false;
    this.phoneExists = false;
    this.emailExists = false;
    this.cnicExists = false;
    this.licenseExists = false;
    this.registrationExists = false;
    this.sendCodeLoading = true;
    this.formInvalid = false;
    this.formSubmitted = false;

    if (this.phone.errors) {
      this.phoneView.nativeElement.classList.add('is-invalid');
      this.phoneInvalid = true;
      return;
    }
    this.phoneView.nativeElement.classList.remove('is-invalid');
    this.phoneInvalid = false;

    this.getCode('resend');
  }

  async getCode(sendStatus?: string) {
    this.resendStatus = false;
    const obs = await this.adminService.getVerificationCode({
      phone: this.phone.value,
      countryCode: '+92',
    });
    obs.subscribe(
      (response) => {
        this.sendCodeLoading = false;
        if (sendStatus === 'resend') {
          this.resendStatus = true;
          this.codeResent = true;
        } else {
          this.codeSent = true;
        }
        this.fieldEnable = true;
        this.changeNumber = true;
        this.phoneView.nativeElement.disabled = true;
        this.codeView.nativeElement.disabled = false;
      },
      (error: AppError) => {
        this.sendCodeLoading = false;
        if (
          error.originalError.error.message === 'Max send attempts reached' ||
          error.originalError.error.message === 'Too many requests'
        ) {
          this.maxAttempts = true;
        } else {
          console.log(error);
        }
      }
    );
  }

  async verifyCode() {
    this.codeSent = false;
    this.codeResent = false;
    this.codeVerified = false;
    this.codeNotVerified = false;
    this.changeNumber = false;
    this.maxAttempts = false;
    this.confirmCodeLoading = true;
    this.formInvalid = false;
    this.formSubmitted = false;
    this.phoneExists = false;
    this.emailExists = false;
    this.cnicExists = false;
    this.licenseExists = false;
    this.registrationExists = false;

    if (this.code.errors) {
      console.log(this.code.errors);
      this.codeView.nativeElement.classList.add('is-invalid');
      this.codeInvalid = true;
      return;
    }
    this.codeView.nativeElement.classList.remove('is-invalid');
    this.codeInvalid = false;

    this.checkVerification();
  }

  async checkVerification() {
    const obs = await this.adminService.verifyCode({
      phone: this.phone.value,
      countryCode: '+92',
      code: this.code.value,
    });
    obs.subscribe(
      (response) => {
        this.confirmCodeLoading = false;
        this.changeNumber = true;
        this.codeVerified = true;
        this.codeView.nativeElement.disabled = true;
      },
      (error: AppError) => {
        this.confirmCodeLoading = false;
        this.changeNumber = true;
        this.codeNotVerified = true;
        console.log(error);
      }
    );
  }

  changePhoneNumber() {
    this.fieldEnable = false;
    this.codeSent = false;
    this.codeResent = false;
    this.codeVerified = false;
    this.codeNotVerified = false;
    this.changeNumber = false;
    this.formInvalid = false;
    this.formSubmitted = false;
    this.phoneExists = false;
    this.emailExists = false;
    this.cnicExists = false;
    this.licenseExists = false;
    this.registrationExists = false;
    this.phoneView.nativeElement.disabled = false;
    this.codeView.nativeElement.disabled = true;
  }

  async createDriver() {
    if (this.createDriverForm.invalid) {
      console.log(this.createDriverForm);
      this.formInvalid = true;
      this.formSubmitted = false;
      return;
    }

    this.codeSent = false;
    this.codeResent = false;
    this.codeNotVerified = false;
    this.changeNumber = false;
    this.formInvalid = false;
    this.formSubmitted = false;
    this.phoneExists = false;
    this.emailExists = false;
    this.cnicExists = false;
    this.licenseExists = false;
    this.registrationExists = false;
    this.createDriverLoading = true;
    this.createDriverForm.patchValue({ nationality: 'Pakistan' });

    const uploadImgObs = await this.firebaseImageHandler.uploadProfileImg(
      this.createDriverForm.value,
      'drivers'
    );
    uploadImgObs.subscribe(async (imgUrl) => {

      const obs = await this.driverServide.createDriver(
        this.createDriverForm.value,
        imgUrl
      );
      obs.subscribe(
        async (response: any) => {
          console.log(response);
          this.createDriverForm.patchValue({ driver: response.data.data.id });

          const vehicleImageObs = await this.firebaseImageHandler.uploadProfileImg(
            this.createDriverForm.value,
            'vehicles'
          );
          vehicleImageObs.subscribe(async (vehicleImgUrl) => {

            const obs = await this.carService.createCar(
              this.createDriverForm.value,
              vehicleImgUrl
            );
            obs.subscribe(
              (response) => {
                console.log(response);
                this.createDriverLoading = false;
                this.formSubmitted = true;
                this.codeVerified = false;
                this.createDriverForm.reset();
                this.fieldEnable = false;
                this.phoneView.nativeElement.disabled = false;
                this.codeView.nativeElement.disabled = true;
              },
              async (error: AppError) => {

                const obs = await this.driverServide.deleteDriver({
                  id: response.data.data.id
                });
                obs.subscribe(
                  (response) => {
                  }, (err) => {
                    console.log(err);
                  }
                );

                this.createDriverLoading = false;
                this.firebaseImageHandler.deleteImage(imgUrl);
                this.firebaseImageHandler.deleteImage(vehicleImgUrl);
                if (error instanceof BadInput) {
                  if (
                    error.originalError.error.message ===
                    'Duplicate field value: registrationNo. Please use another value!'
                  ) {
                    this.registrationExists = true;
                  }
                } else {
                  console.log(error);
                }
              }
            );
          });
        },
        (error: AppError) => {
          this.createDriverLoading = false;
          this.firebaseImageHandler.deleteImage(imgUrl);
          if (error instanceof BadInput) {
            if (
              error.originalError.error.message ===
              'Duplicate field value: email. Please use another value!'
            ) {
              this.emailExists = true;
            } else if (
              error.originalError.error.message ===
              'Duplicate field value: phone. Please use another value!'
            ) {
              this.phoneExists = true;
            } else if (
              error.originalError.error.message ===
              'Duplicate field value: cnic. Please use another value!'
            ) {
              this.cnicExists = true;
            } else if (
              error.originalError.error.message ===
              'Duplicate field value: license. Please use another value!'
            ) {
              this.licenseExists = true;
            }
          } else {
            console.log(error);
            throw error;
          }
        }
      );
    });
  }

  logout() {
    this.authService.logout();
  }
}
