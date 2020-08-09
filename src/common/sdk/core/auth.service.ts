import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  public saveTokenToStorage(token: string) {
    localStorage.setItem('token', token);
  }

  public getTokenFromStorage() {
    return localStorage.getItem('token');
  }

  public getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  public async logout() {
    await localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  public setFieldDataToStorage(fieldName: string, fieldData: any) {
    localStorage.setItem(fieldName, fieldData);
  }

  public getFieldDataFromStorage(fieldName: string) {
    return localStorage.getItem(fieldName);
  }

  public async clearFieldDataFromStorage(fieldName: string) {
    await localStorage.removeItem(fieldName);
  }

  public setCurrentUser(currentUser) {
    localStorage.setItem('current-driver', currentUser);
  }

  public getCurrentUser() {
    return localStorage.getItem('current-driver');
  }

}
