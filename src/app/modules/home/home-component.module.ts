 import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponentComponent } from './home-component.component';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [
    HomeComponentComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
})
export class HomeModule { }
