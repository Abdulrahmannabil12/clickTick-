import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';

import { FooterComponent } from './_layout/components/footer/footer.component';
import { LayoutComponent } from './_layout/layout.component';
import { HeaderComponent } from './_layout/components/header/header.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
  ],
  exports: [
  ]
})
export class LayoutModule { }
