import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-ng-popups';

/**
 * Default Dialog Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'basic.html',
})
export class DefaultDialogComponent {
    @ViewChild('alertDialog')
    public alertDialog: DialogComponent;
    @ViewChild('confirmDialog')
    public confirmDialog: DialogComponent;
    @ViewChild('promptDialog')
    public promptDialog: DialogComponent;
    public alertHeader: string = 'Low Battery';
    public confirmHeader: string = 'Delete Multiple Items';
    public promptHeader: string = 'Join Wi-Fi network';
    public alertContent: string = '10% of battery remaining';
    public confirmContent: string = '<span>Are you sure you want to permanently delete all of these items?</span>';
    public showCloseIcon: Boolean = false;
    public visible: Boolean = true;
    public hidden: Boolean = false;
    public confirmCloseIcon: Boolean = true;
    public target: string = '.control-section';
    public alertWidth: string = '250px';
    public confirmWidth: string = '400px';
    public promptWidth: string = '330px';
    public animationSettings: Object = { effect: 'None' };
    public hide: any;
    ngAfterViewInit():void{
        document.getElementById('alertbtn').focus();
        document.getElementById('password').addEventListener("focus", function () {
            this.parentElement.classList.add('e-input-focus');
        });
        document.getElementById('password').addEventListener("blur", function () {
            this.parentElement.classList.remove('e-input-focus');
            });
    }
    alertDlgBtnClick() {
        this.hide();
    }
    confirmDlgBtnClick() {
        this.hide();
    }
    promptDlgBtnClick() {
        this.hide();
    }

    public alertDlgButtons: Object[] = [{ click: this.alertDlgBtnClick, buttonModel: { content: 'Dismiss', cssClass: 'e-flat', isPrimary: true } }];
    public confirmDlgButtons: Object[] = [{ click: this.confirmDlgBtnClick, buttonModel: { content: 'Yes', cssClass: 'e-flat', isPrimary: true } }, { click: this.confirmDlgBtnClick, buttonModel: { cssClass: 'e-flat', content: 'No' } }];
    public promptDlgButtons: Object[] = [{ click: this.promptDlgBtnClick, buttonModel: { content: 'Connect', cssClass: 'e-flat', isPrimary: true } }, { click: this.promptDlgBtnClick, buttonModel: { cssClass: 'e-flat', content: 'Cancel' } }];

    alertBtnClick() {
        this.alertDialog.show();
        this.dialogOpen();
    }

    confirmBtnClick() {
        this.confirmDialog.show();
        this.dialogOpen();
    }

    promptBtnClick() {
        this.promptDialog.show();
        this.dialogOpen();
    }

    dialogClose() {
        (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).classList.remove('e-btn-hide');
        (document.querySelectorAll('.dlgbtn')[1] as HTMLElement).classList.remove('e-btn-hide');
        (document.querySelectorAll('.dlgbtn')[2] as HTMLElement).classList.remove('e-btn-hide');
    }
    dialogOpen() {
        (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).classList.add('e-btn-hide');
        (document.querySelectorAll('.dlgbtn')[1] as HTMLElement).classList.add('e-btn-hide');
        (document.querySelectorAll('.dlgbtn')[2] as HTMLElement).classList.add('e-btn-hide');
    }

    constructor() { }

}