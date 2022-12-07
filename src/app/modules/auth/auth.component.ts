import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseAuthService } from './_services/base.auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  today: Date = new Date();

  constructor(private authService: BaseAuthService,
    private router: Router,) { }

  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user && user.typ == "Company") {
      this.router.navigate(['client']);
    } else if (user && user.typ == "Admin") {
      this.router.navigate(['']);
    }
  }

}
