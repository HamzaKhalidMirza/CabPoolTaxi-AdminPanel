import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppError } from 'src/common/error/app-error';
import { BadInput } from 'src/common/error/bad-input';
import { AuthService } from 'src/common/sdk/core/auth.service';
import { NotFoundError } from 'src/common/error/not-found-error';
import { UnAuthorized } from 'src/common/error/unauthorized-error';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/common/sdk/custom/api/adminAuth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: any = false;
  formSubmit: any = false;

  constructor(
    private router: Router,
    private titleService: Title,
    private formBuilder: FormBuilder,
    private adminAuthService: AdminAuthService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Login | CabPoolTaxi');
    this.formInitializer();
  }

  formInitializer() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });
    this.loginForm.reset();
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.formSubmit = true;
    this.loading = true;

    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }

    this.adminAuthService.loginAdmin(this.loginForm.value).subscribe(
      async (response) => {
        this.loading = false;
        this.formSubmit = false;
        this.loginForm.reset();
        console.log(response);
        await this.authService.clearFieldDataFromStorage('admin-auth');
        await this.authService.saveTokenToStorage(response.token);
        this.router.navigateByUrl('/dashboard');
      },
      (error: AppError) => {
        this.loading = false;
        if (error instanceof BadInput) {
          this.email.setErrors({ invalid: true });
          this.password.setErrors({ invalid: true });
        } else if (error instanceof UnAuthorized) {
          this.email.setErrors({ invalid: true });
          this.password.setErrors({ invalid: true });
        } else {
          throw error;
        }
      }
    );
  }
}
