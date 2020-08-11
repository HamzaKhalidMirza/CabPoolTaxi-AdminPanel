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
export class CarService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public async getAllCars() {
    const token = await this.authService.getTokenFromStorage();

    const url = AdminAppConfig.getHostPath() + '/api/v1/vehicles';

    return this.http.get(url,  {
      headers: new HttpHeaders().set("Authorization", "Bearer " + token),
    })
    .pipe(
      map((response: Response) => response),
      catchError(this.handleError)
    );
  }

  public async getSingleCar(credentials: object | any) {
    const token = await this.authService.getTokenFromStorage();

    const url = AdminAppConfig.getHostPath() + '/api/v1/vehicles/'+credentials.carId;

    return this.http.get(url,  {
      headers: new HttpHeaders().set("Authorization", "Bearer " + token),
    })
    .pipe(
      map((response: Response) => response),
      catchError(this.handleError)
    );
  }

  public async createCar(credentials: object | any, imgUrl) {
    const token = await this.authService.getTokenFromStorage();
    const url = AdminAppConfig.getHostPath() + '/api/v1/vehicles';

    let formData = {
      'ac': credentials.ac,
      'modelName': credentials.modelName,
      'totalSeats': credentials.totalSeats,
      'registrationNo': credentials.registrationNo,
      'color': credentials.color,
      'vehicleAvatar': imgUrl,
      'driver': credentials.driver,
      'type': credentials.type,
      'description': credentials.description
    };

    return this.http.post(url, formData,  {
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

