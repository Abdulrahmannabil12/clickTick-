import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseAuthService } from '../_services/base.auth.service';
import { UserTypeEnum } from '../_models/enums/userTypes.enum';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  defaultAuth: any = {
    userName: '',
    password: '',
  };
  loginForm: FormGroup = {} as FormGroup ;
  hasError: boolean | undefined;
  returnUrl: string | undefined;
  isLoading$: Observable<boolean>;
  userTypeEnum = UserTypeEnum;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  hide = true;
  constructor(
    private fb: FormBuilder,
    private authService: BaseAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
  }

  ngOnInit(): void {
    this.initForm();
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  login(): void {
    const username = this.f['userName'].value;
    const password = this.f['password'].value;
    this.authService
      .LoginUser(username, password)
      .pipe(first())
      .subscribe((user) => {
        const returnUrl =
          this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
        if (returnUrl) {
          this.router.navigate([returnUrl]);
        } else {
          const userData = this.authService.getUserData();
          if (userData.typ === this.userTypeEnum[UserTypeEnum.Company].toString()) {
            this.router.navigate(['/client/home']);
          } else {
            this.router.navigate(['/']);
          }
        }
      });
    setTimeout(() =>
      this.authService.isLoadingSubject.next(false),
      1500);
  }

  initForm() {
    this.loginForm = this.fb.group({
      userName: [
        this.defaultAuth.userName,
        Validators.compose([
          Validators.required,
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
        ]),
      ],
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
