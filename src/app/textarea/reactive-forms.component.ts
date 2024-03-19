import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmitType } from '@syncfusion/ej2-base';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { FieldErrorDisplayComponent } from './field-error-display.backup';
import { NgClass } from '@angular/common';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
    selector: 'about',
    styleUrls: ['reactive.component.css'],
    templateUrl: 'reactive-forms.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgClass, FieldErrorDisplayComponent, DialogModule, TextAreaModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ReactiveComponent {
  form: FormGroup;

  @ViewChild('Dialog')
  public dialogObj: DialogComponent;
   public width: string = '335px';
   public visible: boolean = false;
   public multiple: boolean = false;
   public showCloseIcon: Boolean = true;
   public formHeader: string = 'Success';
   public content: string = 'Your feedback is submitted, Thank you.';
   public target: string = '#control_wrapper';
   public isModal: boolean = true;
   public animationSettings: any = {
          effect: 'Zoom'
      };
   public textareaValue;
   private formSubmitAttempt: boolean;
   public dlgBtnClick: EmitType<object> = () => {
    this.dialogObj.hide();
  }
  public dlgButtons: Object[] = [{ click: this.dlgBtnClick.bind(this), buttonModel: { content: 'Ok', isPrimary: true } }];
  public focusoutfunction(args: any) {
    if (args.target.value !== '') {
      args.target.parentElement.getElementsByClassName('e-float-text')[0].classList.add('e-label-top');
    } else {
      args.target.parentElement.getElementsByClassName('e-float-text')[0].classList.remove('e-label-top');
    }
  }
  public Submit(): void {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      this.dialogObj.show();
      this.form.reset();
    }
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.textareaValue='';
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      comment: [null, Validators.required]
    });
  }

  public isFieldValid(field: string) {
    return !this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched);
  }
}
