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
    public buttons: Object[] = [{ click: this.dlgButtonClick, buttonModel: { content: 'Ok', cssClass: 'e-flat', isPrimary: true } }];
    public isModal: Boolean = true;
    public animationSettings: Object = { effect: 'None' };
    public hide: any;
    ngAfterViewInit():void{
        document.getElementById('modalbtn').focus();
        this.modalDialog.show();
    }
    modalBtnClick() {
        this.modalDialog.show();
    }
    modalDlgClose() {
        document.getElementById('modalbtn').style.display = '';
    }
    modalDlgOpen() {
        document.getElementById('modalbtn').style.display = 'none';
    }

    dlgButtonClick() {
        this.hide();
    }
    public overlayClick(): void {
        if ((document.getElementById('checkbox') as HTMLInputElement).checked) {
            this.modalDialog.hide();
        }
    }
    constructor() {
    }
}