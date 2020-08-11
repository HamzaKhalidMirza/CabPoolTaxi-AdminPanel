import { AuthService } from './../../core/auth.service';
import { AdminAppConfig } from './../../../admin-app.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BadInput } from '../../../error/bad-input';
import { NotFoundError } from '../../../error/not-found-error';
import { AppError } from '../../../error/app-error';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UnAuthorized } from 'src/common/error/unauthorized-error';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public async getAllDrivers() {
    const token = await this.authService.getTokenFromStorage();

    const url = AdminAppConfig.getHostPath() + '/api/v1/drivers';

    return this.http.get(url,  {
      headers: new HttpHeaders().set("Authorization", "Bearer " + token),
    })
    .pipe(
      map((response: Response) => response),
      catchError(this.handleError)
    );
  }

  public async getSingleDriver(credentials: object | any) {
    const token = await this.authService.getTokenFromStorage();

    const url = AdminAppConfig.getHostPath() + '/api/v1/drivers/'+credentials.driverId;

    return this.http.get(url,  {
      headers: new HttpHeaders().set("Authorization", "Bearer " + token),
    })
    .pipe(
      map((response: Response) => response),
      catchError(this.handleError)
    );
  }

  public async createDriver(credentials: object | any, imgUrl) {
    const token = await this.authService.getTokenFromStorage();
    const url = AdminAppConfig.getHostPath() + '/api/v1/drivers';

    let formData = {
      'phone': credentials.phone,
      'username': credentials.username,
      'email': credentials.email,
      'gender': credentials.gender,
      'role': credentials.role,
      'password': credentials.password,
      'photoAvatar': imgUrl,
      'cnicNo': credentials.cnicNo,
      'licenseNo': credentials.licenseNo,
      'address': credentials.address
    };

    return this.http.post(url, formData,  {
      headers: new HttpHeaders().set("Authorization", "Bearer " + token),
    })
    .pipe(
      map((response: Response) => response),
      catchError(this.handleError)
    );
  }

  public async deleteDriver(credentials: object | any) {
    const token = await this.authService.getTokenFromStorage();
    const url = AdminAppConfig.getHostPath() + '/api/v1/drivers/'+credentials.id;

    return this.http.delete(url,  {
      headers: new HttpHeaders().set("Authorization", "Bearer " + token),
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

