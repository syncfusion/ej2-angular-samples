import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';

/**
 * Multiple Dialogs Component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['multiple-dialogs.css'],
    templateUrl: 'multiple-dialogs.html'
})

export class MultipleDialogsDialogComponent {
    @ViewChild('defaultDialog')
    public defaultDialog: DialogComponent;
    @ViewChild('dialogObj2')
    public dialogObj: DialogComponent;
    public dialogHeader: string = 'First Dialog';
    public dialogCloseIcon: Boolean = true;
    public dialogWidth: string = '330px';
    public contentData: string = "This is the first dialog and acts as a parent dialog, you can open the second (child) dialog by clicking 'Next'.";
    public animationSettings: Object = { effect: 'None' };
    public secondDlgHeader: string = 'Second Dialog';
    public secondDialogCloseIcon: Boolean = true;
    public secondDialogWidth: string = '285px';
    public contentData1: string = "This is the second dialog and act as a child dialog.";
    public animationSettings1: Object = { effect: 'None' };
    public isModal: Boolean = true;
    public hide: any;
    public target: string = '.control-section';
    public showCloseIcon: Boolean = false;
    public visible: Boolean = true;
    public visible2: Boolean = false;

    public dlgButtonClick: EmitType<Object> = () => {
        this.dialogObj.show();
    }

    public dlgButtonClick1: EmitType<Object> = () => {
        this.dialogObj.hide();
    }

    public confirmBtnClick: EmitType<Object> = () => {
        this.defaultDialog.show();
    }

    public defaultDlgButtons: Object[] = [{ click: this.dlgButtonClick.bind(this), buttonModel: { content: 'Next', isPrimary: true } }];
    public secondDlgButtons: Object[] = [{ click: this.dlgButtonClick1.bind(this), buttonModel: { content: 'Close', isPrimary: true } }];

    public dialogClose: EmitType<Object> = () => {
        document.getElementById('dialogBtn').style.display = 'block';
    }

    public dialogClose2: EmitType<Object> = () => {
        document.getElementById('dialogBtn').style.display = 'none';
    }

    public dialogOpen: EmitType<Object> = () => {
        document.getElementById('dialogBtn').style.display = 'none';
    }

    constructor() { }
}