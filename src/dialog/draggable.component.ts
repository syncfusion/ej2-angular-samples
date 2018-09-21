import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';

/**
 * Draggable Dialog Component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['draggable.css'],
    templateUrl: 'draggable.html'
})

export class DraggableDialogComponent {
    @ViewChild('defaultDialog')
    public defaultDialog: DialogComponent;
    public dialogHeader: string = 'Drag Me!!!';
    public dialogCloseIcon: Boolean = true;
    public dialogWidth: string = '300px';
    public contentData: string = "This is a dialog with draggable support.";
    public dialogdragging: Boolean = true;
    public animationSettings: Object = { effect: 'None' };
    public isModal: Boolean = true;
    public hide: any;
    public target: string = '.control-section';
    public showCloseIcon: Boolean = false;
    public visible: Boolean = true;

    public dialogBtnClick: EmitType<Object> = () => {
        this.defaultDialog.show();
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