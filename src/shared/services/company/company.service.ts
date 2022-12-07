import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ResponseData } from 'src/app/_metronic/shared/crud-table/models/response-data.model';
import { BaseTableService } from 'src/app/_metronic/shared/crud-table/services/base.table.service';
import { environment } from 'src/environments/environment';
import { Company } from '../../model/company/company.model';
import { RequestData } from '../../model/request/request-data.model';
import { HttpService } from '../API/Base/http.service';
import { NotificationService } from 'src/shared/services/notification/notification.service';
import { SessionService } from 'src/app/modules/auth/_services/LocalStorage/session.service';
@Injectable({
  providedIn: 'root',
})
export class CompanyService extends BaseTableService<Company> {

  url = 'company/';
  uploadContractUrl = this.url + 'UploadCompanyContract';

  constructor(http: HttpClient, private httpService: HttpService, notify: NotificationService, sessionService: SessionService) {
    super(http, notify, sessionService);
    this.controller = 'Company';
  }

  getTableHeaderAndFields() {
    return [
      { field: 'nameAr', header: 'Name Ar ' },
      { field: 'nameEn', header: 'Name En ' },
      // {
      //   field: 'contractTypeId',
      //   header: 'Contract Type',
      //   type: 'contractTypeId',
      // },
      { field: 'contractIssuingDate', header: 'Contract Issuing Date', type: 'Date' },
      { field: 'contractEndDate', header: 'Contract End Date', type: 'Date' },
      { field: 'active', header: 'Active', type: 'bool' },
    ];
  }

  public getAllLight(): Observable<ResponseData<Company[]>> {
    return this.httpService.get(this.url + 'getAllLight');
  }

  checkEmail(email: string) {
    return this.httpService.post(this.url + 'checkEmail', { email });
  }

  public changeState(object: Company): Observable<Company> {
    return this.httpService.post(this.url + 'ChangeState', object);
  }
  public getDetailsLists(): Observable<RequestData<Company>> {
    return this.httpService.get(this.url + 'GetDetailsLists');
  }

  public getCompanyUserId(CompanyUserId: string): Observable<Company> {
    return this.httpService.post<any>(this.url + 'GetCompanyByUserId', {
      CompanyUserId,
    });
  }

  public getCompaniesByCompanyName(ComapnyName: string): Observable<Company[]> {
    this._isLoading$.next(true);
    return this.httpService.post<any>(this.url + 'GetCompanyByCompanyName', {
      ComapnyName,
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

  getCompanyContactsUrl(fileName: string) {
    return `${environment.apiUrl}/CompanyContracts?FileName=${fileName}`;
  }

}
