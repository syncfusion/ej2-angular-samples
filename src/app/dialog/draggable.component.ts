import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { DialogComponent, AnimationSettingsModel } from '@syncfusion/ej2-angular-popups';

/**
 * Draggable Dialog Component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['draggable.css'],
    templateUrl: 'draggable.html',
    encapsulation: ViewEncapsulation.None
})

export class DraggableDialogComponent {

    @ViewChild('defaultDialog')
    public defaultDialog: DialogComponent;

    @ViewChild('dialogBtn')
    public dialogBtn: ElementRef;

    public dialogHeader: string = 'Drag Me!!!';
    public dialogCloseIcon: Boolean = true;
    public dialogWidth: string = '300px';
    public contentData: string = 'This is a dialog with draggable support.';
    public dialogdragging: Boolean = true;
    public animationSettings: AnimationSettingsModel = { effect: 'None' };
    public isModal: Boolean = true;
    public target: string = '.control-section';
    public showCloseIcon: Boolean = false;
    public visible: Boolean = true;

    public dialogBtnClick = (): void => {
        this.defaultDialog.show();
        this.dialogOpen();
    }

    public dialogClose = (): void => {
        this.dialogBtn.nativeElement.style.display = 'block';
    }

    public dialogOpen = (): void => {
        this.dialogBtn.nativeElement.style.display = 'none';
    }

    constructor() { }
}
