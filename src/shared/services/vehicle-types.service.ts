import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/_metronic/shared/crud-table/services/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleTypesService {
   constructor(private httpService: HttpService) { }

  public getVehicleTypes(): Observable<any> {
    const url = `Vehicle/GetAllVehicleTypes`;
    return this.httpService.get<any>(url);
  }
}
