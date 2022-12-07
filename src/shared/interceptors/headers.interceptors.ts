import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseAuthService } from "src/app/modules/auth/_services/base.auth.service";
import { SessionService } from "../services/LocalStorage/session.service";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(
    private sessionService: SessionService,
    private authService: BaseAuthService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req.clone();
    if (this.authService.isAuthenticatedUrl(req.url)) {
      if (!req.headers.get("authWithoutType")) {
        const authReq = req.clone({
          headers: req.headers
            .set("Authorization", `Bearer ${this.sessionService.getToken()}`)
            .set("Content-Type", "application/json"),
        });
        return next.handle(authReq);
      } else {
        const authReq = req.clone({
          headers: req.headers
            .set("Authorization", `Bearer ${this.sessionService.getToken()}`)
        });
        return next.handle(authReq);
      }
    }

    return next.handle(req);
  }
}
