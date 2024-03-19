import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmitType } from '@syncfusion/ej2-base';
import { UploaderComponent, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { FieldErrorDisplayComponent } from './field-error-display.backup';


@Component({
    selector: 'about',
    styleUrls: ['file-upload-with-reactive-forms.css'],
    templateUrl: 'file-upload-with-reactive-forms.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, FieldErrorDisplayComponent, UploaderModule, DialogModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ReactiveComponent {
  form: FormGroup;

  @ViewChild('defaultupload')
  public uploadObj: UploaderComponent;
  @ViewChild('Dialog')
  public dialogObj: DialogComponent;
   public width: string = '335px';
   public visible: boolean = false;
   public multiple: boolean = false;
   public showCloseIcon: Boolean = true;
   public formHeader: string = 'Success';
   public content: string = 'Your details have been updated successfully, Thank you.';
   public target: string = '#control_wrapper';
   public isModal: boolean = true;
   public animationSettings: any = {
          effect: 'Zoom'
      };
   private formSumitAttempt: boolean;
   public dlgBtnClick: EmitType<object> = () => {
    this.dialogObj.hide();
  }
  public dlgButtons: Object[] = [{ click: this.dlgBtnClick.bind(this) }];
  public uploadInput: string = '';
  public browseClick() {
      document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click(); return false;
    }
  public Submit(): void {
    this.onFormSubmit();
  }
  public onFileSelect: EmitType<Object> = (args: any) => {
    this.uploadInput = args.filesData[0].name;
  }

  public onFormSubmit(): void {
    this.formSumitAttempt = true;
    if (this.form.valid) {
      this.dialogObj.show();
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      mobile:  [null, [Validators.required, Validators.minLength(10)]],
      upload: [null, Validators.required],
    });
  }

  isFieldValid(field: string) {
    return ((!this.form.get(field).valid && this.form.get(field).touched) ||
    (this.form.get(field).untouched && this.formSumitAttempt));
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
