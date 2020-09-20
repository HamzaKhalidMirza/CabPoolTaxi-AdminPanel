import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CnicService {

  private _jsonURL = 'assets/files/cnic.json';
  constructor(
    private http: HttpClient
  ) { }

  public getCNIC_JSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }
}
