import jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ObjectHasValue } from 'src/shared/helper/helper';
import { HttpService } from 'src/shared/services/API/Base/http.service';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { AuthModel } from '../_models/auth.model';
import { AuthHTTPService } from './auth-http/auth-http.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/shared/services/LocalStorage/session.service';

@Injectable({
  providedIn: 'root',
})
export class BaseAuthService extends HttpService {
  private isLoggedSource = new BehaviorSubject<boolean>(false);
  currentLoggedIn = this.isLoggedSource.asObservable();

  private loginUrl = `${environment.apiUrl}/Account/login`;
  private resetPasswordUrl = `${environment.apiUrl}/Account/resetPassword`;
  urls = [
    'home',
    // 'checkout',
  ];

  isLoadingSubject: BehaviorSubject<boolean>;
  currentUserSubject: BehaviorSubject<any>;
  currentUser$: Observable<any>;
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  public loginStatusSrc = new BehaviorSubject<boolean>(false);
  public stopTimerSrc = new Subject<any>();
  public loginStatus$ = this.loginStatusSrc.asObservable();
  public stopTimer$ = this.stopTimerSrc.asObservable();

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  get isLoading$() {
    return this.isLoadingSubject.asObservable();
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  set currentUserValue(user: any) {
    this.currentUserSubject.next(user);
  }

  constructor(http: HttpClient, private sessionService: SessionService, private authHttpService: AuthHTTPService, private router: Router) {
    super(http);
    this.changeLoginValue();
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<any>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }
  public LoginUser(
    userName: string,
    password: string,

  ): Observable<{
    data: {
      userName: string;
      password: string;
      mobileNo: string;
      email: string;
      token: string;
    };
  }> {
    this.sessionService.setUserName(userName);
    this.isLoadingSubject.next(true);
    return this.http.post<{
      data: {
        userName: string;
        mobileNo: string;
        email: string;
        token: string;
        password: string;
      };
    }>(this.loginUrl, { userName, password }, {
      headers: new HttpHeaders({
        client: 'web',
      })
    }).pipe(
      map((auth: any) => {
        const result = this.setAuthFromLocalStorage(auth);
        if (result) {
          return result;
        }
        return false;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  // private methods
  private setAuthFromLocalStorage(auth: any): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    const data = auth?.data;
    if (data && data.token) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(data));
      this.isLoadingSubject.next(true);
      this.sessionService.setUserData(data)
      this.sessionService.setToken(data.token);
      this.sessionService.setUserName(data.userName);
      this.sessionService.setUserId(data.userId);

      return true;
    }
    return false;
  }



  getUserData(): any {
    const token = this.sessionService.getToken();
    return (token) ? jwt_decode(this.sessionService.getToken()) : null;
  }

  public isLogin(): boolean {
    return this.validToken();
  }
  public forgotPassword(
    email: string,
  ): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.http.post<any>(this.resetPasswordUrl, {
      email
    }).pipe(
      finalize(() => {
        this.isLoadingSubject.next(false);
      })
    );
  }
  public changeLoginValue(): void {
    const isLogin = this.isLogin();
    this.isLoggedSource.next(isLogin);
  }

  public logOut(): void {

    this.sessionService.clearAll();
    this.isLoggedSource.next(false);
  }

  public isAuthenticatedUrl(fullurl: string): boolean {
    // return true;
    return this.urls.some(
      (method) => fullurl.toLowerCase().indexOf(method.toLowerCase()) > -1
    );
  }

  private validToken(): boolean {
    return ObjectHasValue(this.getUserData());
  }


  authorizeUser(): Observable<boolean> {
    this.authHttpService.authorize(this.sessionService.getToken()).toPromise().then((res) => {
      if (!res) {
        this.logOut();
        return of(undefined);
      } else {
        return of(true);
      }
    })
    return of(true);
  }


  getUserByToken(): Observable<any> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.token) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);

    return this.authHttpService.authorize(auth.token).pipe(
      map((user: any) => {
        if (!user) {
          this.logOut();

        }
        this.currentUserSubject.next(auth);
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );


  }
  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);

      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}
