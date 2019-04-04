import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
/**
 * Modal Dialog Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'modal-dialog.html',
})

export class ModalDialogComponent {
    @ViewChild('modalDialog')
    public modalDialog: DialogComponent;
    @ViewChild('overlay')
    public overlay: CheckBoxComponent;
    public target: string = "#modalTarget";
    public width: string = '335px';
    public header: string = 'Software Update';
    public content: string = 'Your current software version is up to date.';
    public isModal: Boolean = true;
    public animationSettings: Object = { effect: 'None' };
    public hide: any;
    ngAfterViewInit(): void {
        document.getElementById('modalbtn').focus();
    }
    // On Button click, modal Dialog will be shown
    public modalBtnClick: EmitType<object> = () => {
        this.modalDialog.show();
    }
    // On Dialog close, 'Open' Button will be shown
    public modalDlgClose: EmitType<object> = () => {
        document.getElementById('modalbtn').style.display = '';
    }
    // On Dialog open, 'Open' Button will be hidden
    public modalDlgOpen: EmitType<object> = () => {
        document.getElementById('modalbtn').style.display = 'none';
    }

    // Close the Dialog, while clicking "OK" Button of Dialog
    public dlgButtonClick: EmitType<object> = () => {
        this.modalDialog.hide();
    }

    public overlayClick: EmitType<object> = () => {
        if (this.overlay.checked) {
            this.modalDialog.hide();
        }
    }

    // Initialize Button to open the modal Dialog
    public buttons: Object[] = [{ click: this.dlgButtonClick.bind(this), buttonModel: { content: 'OK', isPrimary: true } }];
    constructor() {
    }
}