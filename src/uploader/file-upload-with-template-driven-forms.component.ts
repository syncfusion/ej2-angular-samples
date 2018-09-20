import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { isNullOrUndefined, EmitType } from '@syncfusion/ej2-base';

@Component({
  selector: 'sample',
  styleUrls: ['file-upload-with-template-driven-forms.css'],
  templateUrl: 'file-upload-with-template-driven-forms.html',
  encapsulation: ViewEncapsulation.None
})

export class TemplateDrivenComponent {
  @ViewChild('formUpload')
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
  public animationSettings: object = {
    effect: 'Zoom'
  };
  public uploadInput: string = '';
  public dlgBtnClick: EmitType<object> = () => {
    this.dialogObj.hide();
  }
  public dlgButtons: Object[] = [{ click: this.dlgBtnClick.bind(this), buttonModel: { content: 'Ok', isPrimary: true } }];
    @ViewChild('formElement') element: any;

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
   this.dialogObj.show();
 }
}