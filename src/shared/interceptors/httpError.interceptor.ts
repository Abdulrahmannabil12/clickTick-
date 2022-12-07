import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
 import { Router } from '@angular/router';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router
  ) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.handle401Error();
          return EMPTY;
        }
      alert(this.getErrorMessage(error));
        return EMPTY;
      })
    );
  }
  private handle401Error(): void {
    if (this.router.routerState.snapshot.url.toLowerCase().indexOf('login') === -1) {
      this.router.navigate(['./auth'], {
        queryParams: { returnUrl: this.router.routerState.snapshot.url },
      });
    } else {
     alert('invalid user name or password');
    }
  }
  private getErrorMessage(error: any): string {
    return error.error.responseMessage ? error.error.responseMessage: 'Error occurred, Call customer service ! ';
  }
}
