import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { isNullOrUndefined, EmitType } from '@syncfusion/ej2-base';

@Component({
  selector: 'sample',
  styleUrls: ['template-driven.component.css'],
  templateUrl: 'template-driven-forms.html',
  encapsulation: ViewEncapsulation.None
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
  public content: string = 'You have successfully registered, Thank you.';
  public target: string = '#control_wrapper';
  public isModal: boolean = true;
  public animationSettings: object = {
    effect: 'Zoom'
  };
  public UserDetails: UserDetails;

  ngOnInit() {
    this.UserDetails = {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      email:'',
      mobile: ''
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
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    email:'',
    mobile: ''
  };

 }
}
export interface UserDetails {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  mobile: string;
}