import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { BaseTableService } from 'src/app/_metronic/shared/crud-table/services/base.table.service';
import { Company } from '../../model/company/company.model';
import { HttpService } from '../API/Base/http.service';
import { NotificationService } from 'src/shared/services/notification/notification.service';
import { SessionService } from 'src/app/modules/auth/_services/LocalStorage/session.service';
@Injectable({
  providedIn: 'root',
})
export class CompanySearchService extends BaseTableService<Company> {

  url = 'company/';

  constructor(http: HttpClient, private httpService: HttpService, notify: NotificationService, sessionService: SessionService) {
    super(http, notify, sessionService);
    this.controller = 'Company';
  }

  public getCompaniesByCompanyName(ComapnyName: string): Observable<Company[]> {
     return this.httpService.post<any>(this.url + 'GetCompanyByCompanyName', {
      ComapnyName,
    }).pipe(
      catchError((err) => {
        this._errorMessage.next(err);
        console.error('CREATE ITEM', err);
        return of({ id: undefined });
      }),
      finalize(() => {
       })
    );
  }
  public getCompaniesByCompanyNameAndType(nameEn: string, contractTypeId): Observable<Company[]> {
    this._isLoading$.next(true);
    return this.httpService.post<any>(this.url + 'GetAll?PageIndex=0&PageSize=100', {
      nameEn,
      contractTypeId
    }).pipe(
      catchError((err) => {
        this._errorMessage.next(err);
        console.error('CREATE ITEM', err);
        return of({ id: undefined });
      }),
      finalize(() => {
        this._isLoading$.next(false);
      })
    );
  }

}
