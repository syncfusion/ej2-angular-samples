import { Component, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DialogUtility} from '@syncfusion/ej2-angular-popups'
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class DefaultDialogComponent  {
  public dialogObj;
  public alertBtnClick = (): void => {
    document.getElementById("statusText").style.display="none";
    this.dialogObj = DialogUtility.alert({
      title: 'Low Battery',
      content: '10% of battery remaining',
      okButton: { click: this.alertOkAction.bind(this)  },
      position: { X: 'center', Y: 'center' },
      closeOnEscape: true
    });
  };
  private alertOkAction(): void {
    this.dialogObj.hide();
    document.getElementById("statusText").innerHTML="The user closed the Alert dialog.";
    document.getElementById("statusText").style.display="block";
  }
  public confirmBtnClick = (): void => {
    document.getElementById("statusText").style.display="none";
    this.dialogObj = DialogUtility.confirm({
      title: ' Delete Multiple Items',
      content: "Are you sure you want to permanently delete these items?",
      okButton: { click: this.confirmOkAction.bind(this)},
      cancelButton: { click: this.confirmCancelAction.bind(this)},
      position: { X: 'center', Y: 'center' },
      closeOnEscape: true
    });
  };
  private confirmOkAction(): void {
    this.dialogObj.hide();
    document.getElementById("statusText").innerHTML=" The user confirmed the dialog box";
    document.getElementById("statusText").style.display="block";
  }
  private confirmCancelAction(): void {
    this.dialogObj.hide();
    document.getElementById("statusText").innerHTML="The user canceled the dialog box.";
    document.getElementById("statusText").style.display="block";
  }
  public promptBtnClick = (): void => {
    document.getElementById("statusText").style.display="none";
    this.dialogObj = DialogUtility.confirm({
      title: 'Join Chat Group',
      content: 'Enter your name: <input id= "inputEle" type="text" name="Required" class="e-input" placeholder="Type here.." />',
      okButton: { click:this.promptOkAction.bind(this)},
      cancelButton: { click:this.promptCancelAction.bind(this)},
      position: { X: 'center', Y: 'center' },
      closeOnEscape: true
    });
  };
  private promptOkAction(): void {
    let value:string ;
    value = (document.getElementById("inputEle")as any).value;
    if (value==""){
        this.dialogObj.hide();
        document.getElementById("statusText").innerHTML = "The user's input is returned as\" \" ";
        document.getElementById("statusText").style.display="block";
    }
    else{
      this.dialogObj.hide();
      document.getElementById("statusText").innerHTML="The user's input is returned as" +" "+ value;
      document.getElementById("statusText").style.display="block";
    }
  }
  private promptCancelAction(): void {
    this.dialogObj.hide();
    document.getElementById("statusText").innerHTML="The user canceled the prompt dialog";
    document.getElementById("statusText").style.display="block";
  }
}