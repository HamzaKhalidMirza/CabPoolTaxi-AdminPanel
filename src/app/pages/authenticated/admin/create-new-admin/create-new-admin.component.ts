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

@Component({
  selector: 'app-dashboard',
  templateUrl: './create-new-admin.component.html',
  styleUrls: ['./create-new-admin.component.scss'],
})
export class CreateNewAdminComponent implements OnInit, AfterViewInit {
  createAdminForm: FormGroup;
  sendCodeLoading: any = false;
  confirmCodeLoading: any = false;
  createAdminLoading: any = false;
  resendStatus: any;

  @ViewChild('phoneView') phoneView: any;
  @ViewChild('codeView') codeView: any;
  @ViewChild('usernameView') usernameView: any;
  @ViewChild('emailView') emailView: any;
  @ViewChild('genderView') genderView: any;
  @ViewChild('roleView') roleView: any;
  @ViewChild('passwordView') passwordView: any;
  @ViewChild('confPasswordView') confPasswordView: any;

  phoneExists: any;
  emailExists: any;
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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Create New Admin | CabPoolTaxi');
    this.formInitializer();
  }

  ngAfterViewInit() {
    this.codeView.nativeElement.disabled = true;
  }

  formInitializer() {
    this.createAdminForm = this.formBuilder.group({
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
          Validators.pattern('^[a-zA-Z ]*$')
        ],
      ],
      nationality: [''],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      role: ['', [Validators.required]],
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
      photoAvatar: ['', [Validators.required]]
    });
    this.createAdminForm.reset();
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
    return this.createAdminForm.controls;
  }

  get phone() {
    return this.createAdminForm.get('phone');
  }
  get code() {
    return this.createAdminForm.get('code');
  }
  get username() {
    return this.createAdminForm.get('username');
  }
  get email() {
    return this.createAdminForm.get('email');
  }
  get gender() {
    return this.createAdminForm.get('username');
  }
  get role() {
    return this.createAdminForm.get('email');
  }
  get password() {
    return this.createAdminForm.get('password');
  }
  get confPassword() {
    return this.createAdminForm.get('confPassword');
  }
  get nationality() {
    return this.createAdminForm.get('nationality');
  }

  togglePasswordType() {
    if(this.passwordView.nativeElement.type === 'password') {
      this.passwordView.nativeElement.type = 'text';
    } else {
      this.passwordView.nativeElement.type = 'password';
    }
  }

  toggleConfirmPasswordType() {
    if(this.confPasswordView.nativeElement.type === 'password') {
      this.confPasswordView.nativeElement.type = 'text';
    } else {
      this.confPasswordView.nativeElement.type = 'password';
    }
  }

  onImagePicked(imageData: File) {
    this.createAdminForm.patchValue({ photoAvatar: imageData });
    console.log(this.createAdminForm);
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
    this.phoneView.nativeElement.disabled = false;
    this.codeView.nativeElement.disabled = true;
  }

  checkDataForValidity() {

  }

  async createAdmin() {
    if (this.createAdminForm.invalid) {
      console.log(this.createAdminForm);
      this.formInvalid = true;
      this.formSubmitted = false;
      // if(this.phone.errors) {
      //   this.phoneView.nativeElement.classList.add('is-invalid');
      //   this.phoneInvalid = true;
      // }
      // if(this.username.errors) {
      //   this.usernameView.nativeElement.classList.add('is-invalid');
      //   this.usernameInvalid = true;
      // }
      // if(this.email.errors) {
      //   this.emailView.nativeElement.classList.add('is-invalid');
      //   this.emailInvalid = true;
      // }
      // if(this.gender.errors) {
      //   this.genderView.nativeElement.classList.add('is-invalid');
      //   this.genderInvalid = true;
      // }
      // if(this.role.errors) {
      //   this.roleView.nativeElement.classList.add('is-invalid');
      //   this.roleInvalid = true;
      // }
      // if(this.password.errors) {
      //   this.passwordView.nativeElement.classList.add('is-invalid');
      //   this.passwordInvalid = true;
      // }
      // if(this.confPassword.errors) {
      //   this.confPasswordView.nativeElement.classList.add('is-invalid');
      //   this.confPasswordInvalid = true;
      // }
      return;
    }

    // this.phoneView.nativeElement.classList.add('is-invalid');
    // this.phoneInvalid = true;
    // this.usernameView.nativeElement.classList.add('is-invalid');
    // this.usernameInvalid = true;
    // this.emailView.nativeElement.classList.add('is-invalid');
    // this.emailInvalid = true;
    // this.genderView.nativeElement.classList.add('is-invalid');
    // this.genderInvalid = true;
    // this.roleView.nativeElement.classList.add('is-invalid');
    // this.roleInvalid = true;
    // this.passwordView.nativeElement.classList.add('is-invalid');
    // this.passwordInvalid = true;
    // this.confPasswordView.nativeElement.classList.add('is-invalid');
    // this.confPasswordInvalid = true;

    this.codeSent = false;
    this.codeResent = false;
    this.codeNotVerified = false;
    this.changeNumber = false;
    this.formInvalid = false;
    this.formSubmitted = false;
    this.phoneExists = false;
    this.emailExists = false;
    this.createAdminLoading = true;

    this.createAdminForm.patchValue({nationality: 'Pakistan'});
    const obs = await this.adminService.createAdmin(this.createAdminForm.value);
    obs.subscribe(
      (response) => {
        this.createAdminLoading = false;
        this.formSubmitted = true;
        this.codeVerified = false;
        this.createAdminForm.reset();
        this.fieldEnable = false;
        this.phoneView.nativeElement.disabled = false;
        this.codeView.nativeElement.disabled = true;
        console.log(response);
      },
      (error: AppError) => {
        this.createAdminLoading = false;
        if (error instanceof BadInput) {
          if (error.originalError.error.message === 'Duplicate field value: email. Please use another value!') {
            this.emailExists = true;
          } else if (error.originalError.error.message === 'Duplicate field value: phone. Please use another value!') {
            this.phoneExists = true;
          }
        } else {
          console.log(error);
          throw error;
        }
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
