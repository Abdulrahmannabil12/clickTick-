import { BaseAuthService } from 'src/app/modules/auth/_services/base.auth.service';
import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private authService: BaseAuthService) {
    this.authService.logOut();
  }

  ngOnInit(): void {}
}
