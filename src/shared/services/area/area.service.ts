
import { Injectable, OnDestroy, Inject } from '@angular/core';
import { Observable } from "rxjs";
import { TableService, ITableState, PaginatorState, SortState, GroupingState } from './../../../app/_metronic/shared/crud-table' ;
import { Area } from "src/shared/model/area/area.model";
import { RequestData } from "src/shared/model/request/request-data.model";
import { HttpService } from "src/shared/services/API/Base/http.service";
import { HttpClient } from '@angular/common/http';
import { TableResponseModel } from 'src/app/_metronic/shared/crud-table/models/base.table.model';
import { baseFilter } from 'src/app/_fake/fake-helpers/http-extenstions';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const DEFAULT_STATE: ITableState = {
  filter: {},
  paginator: new PaginatorState(),
  sorting: new SortState(),
  searchTerm: '',
  grouping: new GroupingState(),
  entityId: undefined
};

@Injectable({
  providedIn: "root",
})
export class AreaService extends TableService<Area> implements OnDestroy {
  URL = `${environment.apiUrl}/Region/`;

  constructor(private httpService: HttpService,@Inject(HttpClient) http) {
    super(http);
  }
  
  find(tableState: ITableState): Observable<TableResponseModel<Area>> {
    return this.http.get<Area[]>(`${this.URL}GetAll`).pipe(
      map((response: Area[]) => {
        const filteredResult = baseFilter(response, tableState);
        const result: TableResponseModel<Area> = {
          items: filteredResult.items,
          total: filteredResult.total
        };
        return result;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  public getAll(): Observable<RequestData<Area>> {
    return this.httpService.get(this.URL + 'GetAll');
  }
  public getById(object: RequestData<Area>): Observable<RequestData<Area>> {
    return; //this.httpService.post(this.url + 'GetById', object);
  }
  public add(object: RequestData<Area>): Observable<RequestData<Area>> {
    return; //this.httpService.post(this.url + 'Insert', object);
  }
  // public update(object: RequestData<Area>): Observable<RequestData<Area>> {
  //   return; //this.httpService.post(this.url + 'Update', object);
  // }
  public delete(object: RequestData<Area>): Observable<RequestData<Area>> {
    return; //this.httpService.post(this.url + 'Delete', object);
  }
  public changeState(object: RequestData<Area>): Observable<RequestData<Area>> {
    return; //this.httpService.post(this.url + 'ChangeState', object);
  }
}
