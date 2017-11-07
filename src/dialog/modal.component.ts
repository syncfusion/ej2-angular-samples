import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-ng-popups';
/**
 * Default Dialog Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'modal.html',
})

export class ModalDialogComponent {
    @ViewChild('modalDialog')
    public modalDialog: DialogComponent;
    public target: string = "#modalTarget";
    public width: string = '335px';
    public header: string = 'Software Update';
    public content: string = 'Your current software version is up to date.';
    // Initialize Button to open the modal Dialog
    public buttons: Object[] = [{ click: this.dlgButtonClick, buttonModel: { content: 'OK', cssClass: 'e-flat', isPrimary: true } }];
    public isModal: Boolean = true;
    public animationSettings: Object = { effect: 'None' };
    public hide: any;
    ngAfterViewInit():void{
        document.getElementById('modalbtn').focus();
    }
    // On Button click, modal Dialog will be shown
    modalBtnClick() {
        this.modalDialog.show();
    }
    // On Dialog close, 'Open' Button will be shown
    modalDlgClose() {
        document.getElementById('modalbtn').style.display = '';
    }
    // On Dialog open, 'Open' Button will be hidden
    modalDlgOpen() {
        document.getElementById('modalbtn').style.display = 'none';
    }

    // Close the Dialog, while clicking "OK" Button of Dialog
    dlgButtonClick() {
        this.hide();
    }
    // Close the modal Dialog on overlay click
    public overlayClick(): void {
        if ((document.getElementById('checkbox') as HTMLInputElement).checked) {
            this.modalDialog.hide();
        }
    }
    constructor() {
    }
}