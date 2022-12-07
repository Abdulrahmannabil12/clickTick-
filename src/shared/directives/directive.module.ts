import { NgModule } from '@angular/core';
import { DisableControlDirective } from './disableInput.directive';
import { OnlyNumber } from './onlynumber.directive';
import { HorizontalScrollDirective } from './wheelScroll.directive'
@NgModule({
  imports: [],
  declarations: [OnlyNumber, DisableControlDirective, HorizontalScrollDirective],
  exports: [OnlyNumber, DisableControlDirective, HorizontalScrollDirective],
})
export class DirectivesModule { }
