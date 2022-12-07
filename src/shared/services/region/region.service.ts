import { Injectable } from '@angular/core';
import { Region } from 'src/app/modules/region/_model/region.model';
import { BaseService } from '../API/Base/base.service';
import { HttpService } from '../API/Base/http.service';

@Injectable({
  providedIn: 'root',
})
export class RegionService extends BaseService<Region> {
  constructor(httpService: HttpService) {
    super(httpService);
    this.controller = 'Region';
  }
}
