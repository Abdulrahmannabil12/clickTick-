  import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Interceptors } from 'src/shared/interceptors/index.interceptors';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseAuthService } from './modules/auth/_services/base.auth.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    Interceptors,


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
