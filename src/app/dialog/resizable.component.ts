import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';

/**
 * Resizable Dialog Component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['resizable.css'],
    templateUrl: 'resizable.html'
})

export class ResizableDialogComponent {
    @ViewChild('resizeDialog')
    public resizeDialog: DialogComponent;
    public dialogHeader: string = 'Resize Me!!!';
    public dialogCloseIcon: Boolean = true;
    public dialogWidth: string = '300px';
    public contentData: string = "This is a dialog with resizable support.";
    public animationSettings: Object = { effect: 'None' };
    public hide: any;
    public dialogdragging: Boolean = true;
    public target: string = '.control-section';
    public showCloseIcon: Boolean = false;
    public visible: Boolean = true;
    public dialogResize: Boolean = true;

    public dialogBtnClick: EmitType<Object> = () => {
        this.resizeDialog.show();
        this.dialogOpen();
    }

    public dialogClose: EmitType<Object> = () => {
        document.getElementById('dialogBtn').style.display = 'block';
    }

    public dialogOpen: EmitType<Object> = () => {
        document.getElementById('dialogBtn').style.display = 'none';
    }

    constructor() { }
}