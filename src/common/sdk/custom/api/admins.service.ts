import { AuthService } from './../../core/auth.service';
import { AdminAppConfig } from './../../../admin-app.config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BadInput } from '../../../error/bad-input';
import { NotFoundError } from '../../../error/not-found-error';
import { AppError } from '../../../error/app-error';
import { throwError } from 'rxjs';
import { map, catchError, switchMap, tap, finalize } from 'rxjs/operators';
import { UnAuthorized } from 'src/common/error/unauthorized-error';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  public async getAllAdmins() {
    const token = await this.authService.getTokenFromStorage();
    const url = AdminAppConfig.getHostPath() + '/api/v1/admins';

    return this.http
      .get(url, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
      })
      .pipe(
        map((response: Response) => response),
        catchError(this.handleError)
      );
  }

  public async getSingleAdmin(credentials: object | any) {
    const token = await this.authService.getTokenFromStorage();

    const url =
      AdminAppConfig.getHostPath() + '/api/v1/admins/' + credentials.adminId;

    return this.http
      .get(url, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
      })
      .pipe(
        map((response: Response) => response),
        catchError(this.handleError)
      );
  }

  public async getVerificationCode(credentials: object) {
    const token = await this.authService.getTokenFromStorage();
    const url =
      AdminAppConfig.getHostPath() + '/api/v1/admins/getVerificationCode';

    return this.http
      .post(url, credentials, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
      })
      .pipe(
        map((response: Response) => response),
        catchError(this.handleError)
      );
  }

  public async verifyCode(credentials: object) {
    const token = await this.authService.getTokenFromStorage();
    const url = AdminAppConfig.getHostPath() + '/api/v1/admins/verifyCode';

    return this.http
      .post(url, credentials, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
      })
      .pipe(
        map((response: Response) => response),
        catchError(this.handleError)
      );
  }

  public async createAdmin(credentials: object | any, imgUrl) {
    const token = await this.authService.getTokenFromStorage();
    const url = AdminAppConfig.getHostPath() + '/api/v1/admins';

    let formData = {
      'phone': credentials.phone,
      'username': credentials.username,
      'email': credentials.email,
      'gender': credentials.gender,
      'role': credentials.role,
      'password': credentials.password,
      'photoAvatar': imgUrl
    };

    return this.http
      .post(url, formData, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
      })
      .pipe(
        map((response: Response) => response),
        catchError(this.handleError)
      );
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return throwError(new BadInput(error));
    }
    if (error.status === 404) {
      return throwError(new NotFoundError(error));
    }
    if (error.status === 401) {
      return throwError(new UnAuthorized(error));
    }
    return throwError(new AppError(error));
  }
}
