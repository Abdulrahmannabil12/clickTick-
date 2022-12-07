import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Component, OnInit, Input, Output } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { getMatchedKeyboardChar } from 'src/shared/helper/language.helper';
import { NameId } from '../../model/NameId.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-group-material',
  templateUrl: './form-group-material.component.html',
  styleUrls: ['./form-group-material.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fade', [
      transition(':enter', [animate('700ms linear', style({ opacity: 0 }))]),
    ]),
  ],
})
export class FormGroupMaterialComponent implements OnInit, AfterViewInit {
  inputPassword: boolean;
  @Input() fieldLabel: string;
  @Input() error: any;
  @Input() fieldMinLength: number;
  @Input() fieldMaxLength: number;
  @Input() FormGroup: FormGroup;
  @Input() hint: string;
  @Input() inputType: string;
  @Input() OnlyNumber: boolean;
  @Input() maxlengthLimit: number;
  @Input() inputPlaceholder: string;
  @Input() data: any;
  @Input() controlName: string;
  @Input() dataSource: NameId[];
  @Input() matSuffix: string;
  @Input() maxValue: number;
  @Input() minValue: number;
  @Input() minimumValueNumber: number;
  @Input() maximumValueNumber: number;
  @Input() requiredField: true;
  @Input() matPrefix: string;
  @Input() matPrefixIcon: string;
  @Input() lazyInput: boolean;
  @Input() isArabic?: boolean = null;
  @Input() isSearch?: boolean = false;
  @Input() toggleInputVisibility?: boolean = false;

  @Input() fieldName = 'Name';
  @Input() fieldValue = 'Id';

  @Output() changeValue: EventEmitter<number>;

  @Output() onInputLeave: EventEmitter<string>;

  constructor() {
    this.fieldLabel = '';
    this.fieldMinLength = undefined;
    this.fieldMaxLength = undefined;
    this.hint = '';
    this.inputType = '';
    this.inputPlaceholder = '';
    this.controlName = '';
    this.dataSource = [];
    this.maxValue = null;
    this.minValue = null;
    this.changeValue = new EventEmitter();
    this.onInputLeave = new EventEmitter();
  }

  ngOnInit(): void {
    this.inputType === 'password'
      ? (this.inputPassword = true)
      : (this.inputPassword = false);
  }
  ngAfterViewInit(): void {


  }
  toggleInputType() {
    this.inputPassword = !this.inputPassword;
    this.inputType === 'password' ? this.inputType = 'text' : this.inputType = 'password';
  }
  onChangeValue(event: any): void {
    if (event && event.value !== undefined) {
      const id = event.value;
      this.changeValue.emit(+id);
    }
  }
  isControlValid(): boolean {
    const control = this.FormGroup.controls[this.controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(): boolean {
    const control = this.FormGroup.controls[this.controlName];

    return (
      control.invalid &&
      (control.hasError('pattern') || control.hasError('email') || control.hasError('invalid'))
    );
  }


  getNumberVal(element) {
    if (!isNaN(Number(element))) {
      return element
    }
  }
  controlHasError(validation): boolean {
    const control = this.FormGroup.controls[this.controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(): boolean {
    const control = this.FormGroup.controls[this.controlName];
    return control.dirty || control.touched;
  }
  controlHasMinValError(): boolean {
    const control = this.FormGroup.controls[this.controlName];
    return control.hasError('InvalidMinVal') && (control.dirty || control.touched);
  }

  controlHasMaxValError() {
    const control = this.FormGroup.controls[this.controlName];
    return control.hasError('InvalidMaxVal') && (control.dirty || control.touched);
  }

  onBlur(event: string): void {
    this.onInputLeave.emit(event);
  }


  onKeyDown(key: KeyboardEvent) {
    if (this.isArabic != null) {
      const control = this.FormGroup.controls[this.controlName];
      let value = control.value;

      const charCode = (key.which) ? key.which : key.keyCode;
      if (charCode >= 1300 || charCode == 9 || charCode == 8 || charCode == 16 || charCode == 17 ||
        charCode == 46 || charCode == 37 || charCode == 97 || (charCode >= 48 && charCode <= 57)) {
        return;
      }
      key.preventDefault();

      if (key.keyCode == 189) {
        value += '-';
      }
      const char = getMatchedKeyboardChar(charCode, key, this.isArabic);
      if (char) {
        value += char;
        control.setValue(value);
      }
    }
  }
}
