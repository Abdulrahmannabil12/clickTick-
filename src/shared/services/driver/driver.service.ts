import { Injectable } from '@angular/core';
import { Driver } from '../../model/driver/driver.model';
import { BaseService } from '../API/Base/base.service';
import { HttpService } from '../API/Base/http.service';

@Injectable({
  providedIn: 'root',
})
export class DriverService extends BaseService<Driver> {
  constructor(httpService: HttpService) {
    super(httpService);
    this.controller = 'Driver';
  }
}
