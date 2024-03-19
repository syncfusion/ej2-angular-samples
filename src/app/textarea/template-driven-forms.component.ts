import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { isNullOrUndefined, EmitType } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
    selector: 'sample',
    styleUrls: ['template-driven.component.css'],
    templateUrl: 'template-driven-forms.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [FormsModule, NgClass, NgIf, DialogModule, TextAreaModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class TemplateDrivenComponent {
  @ViewChild('Dialog')
  public dialogObj: DialogComponent;
  @ViewChild('userForm') form: any;
  public width: string = '335px';
  public visible: boolean = false;
  public multiple: boolean = false;
  public showCloseIcon: Boolean = true;
  public formHeader: string = 'Success';
  public content: string = 'Your feedback is submitted, Thank you.';
  public target: string = '#control_wrapper';
  public isModal: boolean = true;
  public animationSettings: object = {
    effect: 'Zoom'
  };
  public UserDetails: UserDetails;

  ngOnInit() {
    this.UserDetails = {
      comment: '',
      email:''
    };
  }
  
  public dlgBtnClick: EmitType<object> = () => {
    this.dialogObj.hide();
  }
  public dlgButtons: Object[] = [{ click: this.dlgBtnClick.bind(this), buttonModel: { content: 'Ok', isPrimary: true } }];
    @ViewChild('formElement') element: any;

   public Submit(): void {
    this.onFormSubmit();
  }
 public onFormSubmit(): void {
   this.dialogObj.show();
   this.form.reset();
   this.UserDetails = {
    comment: '',
    email:''
  };

 }
}
export interface UserDetails {
  comment: string;
  email: string;
}