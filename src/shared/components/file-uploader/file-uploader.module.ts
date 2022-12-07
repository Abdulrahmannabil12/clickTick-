import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InlineSVGModule } from 'ng-inline-svg';
import { DownloadDirective } from 'src/shared/directives/dowenload.directive';
import { FileDragNDropDirective } from 'src/shared/directives/file-drag-n-drop.directive';
import { FileUploaderComponent } from './file-uploader.component';


@NgModule({
  declarations: [
    FileUploaderComponent,
    FileDragNDropDirective,
    DownloadDirective
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    InlineSVGModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [FileUploaderComponent],

})
export class FileUploaderModule { }
