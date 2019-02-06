import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';


@Component({
  selector: 'about',
  styleUrls: ['reactive.component.css'],
  templateUrl: 'reactive-forms.html',
  encapsulation: ViewEncapsulation.None
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
   public content: string = 'You have successfully registered, Thank you.';
   public target: string = '#control_wrapper';
   public isModal: boolean = true;
   public animationSettings: any = {
          effect: 'Zoom'
      };
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
    this.form = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      username: [null, [Validators.required, Validators.minLength(6)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      email: [null, [Validators.required, Validators.email]],
      mobile:  [null, [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]]
    });
  }

  public isFieldValid(field: string) {
    return !this.form.get(field).valid && (this.form.get(field).dirty || this.form.get(field).touched);
  }
}
