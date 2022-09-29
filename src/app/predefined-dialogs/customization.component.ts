import { Component, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DialogUtility} from '@syncfusion/ej2-angular-popups'

@Component({
    selector: 'control-content',
    templateUrl: 'customization.html',
    styleUrls: ['customization.css'],
    encapsulation: ViewEncapsulation.None
})
export class CustomizationDialogComponent  {
  public dialogObj;
  public alertBtnClick = (): void => {
    document.getElementById('statusText').style.display="none";
    this.dialogObj = DialogUtility.alert({
      title: '',
      content:'<div class="new" style="display: flex;flex-direction: column;align-items: center;"><p><span class="circle-border"><span class="e-icons e-check" style="font-size: 30px; color: green; font-weight: 700;"></span></span></p><p><b style="font-size:25px; font-weight: 500 !important;">Good job!</b></p><p>You clicked the button!</p></div>',
      okButton: { text: 'OK', click: this.alertOkAction.bind(this) },
      position: { X: 'center', Y: 'center' },
      width: '240px',
    });
  };
  private alertOkAction(): void {
    this.dialogObj.hide();
    document.getElementById('statusText').innerHTML ='The user closed the Alert dialog.';
    document.getElementById('statusText').style.display="block";
  }
  public confirmBtnClick = (): void => {
    document.getElementById('statusText').style.display="none";
    this.dialogObj = DialogUtility.confirm({
      title: ' Delete file',
      content:'<p ><span class= "e-icons e-changes-reject" style="float: left;padding-right: 10px;font-size: 25px;display: inline;"></span>Are you sure you want to permanently delete this file?</p><p class="fileEdit"><span class= "e-icons e-image" style="font-size: 60px;"></span><span>failed personas.png<br/>Item type:PNG File<br/>Dimenstion: 1384 * 782<br/>Size:374 KB<br/>Original Location: C:/Users/Images</span></p>',
      okButton: { text: 'YES', click: this.confirmOkAction.bind(this) },
      cancelButton: {text: 'No',click: this.confirmCancelAction.bind(this) },
      position: { X: 'center', Y: 'center' },
      width: '420px',
    });
  };
  private confirmOkAction(): void {
    this.dialogObj.hide();
    document.getElementById('statusText').innerHTML ='The user confirmed the dialog box';
    document.getElementById('statusText').style.display="block";
  }
  private confirmCancelAction(): void {
    this.dialogObj.hide();
    document.getElementById('statusText').innerHTML ='The user canceled the dialog box.';
    document.getElementById('statusText').style.display="block";
  }
  public promptBtnClick = (): void => {
    document.getElementById('statusText').style.display="none";
    this.dialogObj = DialogUtility.confirm({
      title: 'Join Wi-Fi network',
      content:'<table class="Table"><tbody><tr><td>SSID: <b>AndroidAP</b></td></tr><tr> <td>Password:</td> </tr> <tr> <td> <span class="e-input-group"> <input type="password" id="password" name="Required" class="e-input"> </span> </td> </tr> </tbody> </table> ',
      okButton: { text: 'OK', click: this.promptOkAction.bind(this) },
      cancelButton: { click: this.promptCancelAction.bind(this) },
      animationSettings: { effect: 'Zoom', delay: 0, duration: 250 },
      position: { X: 'center', Y: 'center' },
      width: '240px',
    });
  };
  private promptOkAction(): void {
    this.dialogObj.hide();
    document.getElementById('statusText').innerHTML ='The user confirmed the dialog box';
    document.getElementById('statusText').style.display="block";
  }
  private promptCancelAction(): void {
    this.dialogObj.hide();
    document.getElementById('statusText').innerHTML ='The user canceled the prompt dialog';
    document.getElementById('statusText').style.display="block";
  }
}
