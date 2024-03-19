import { Component, ViewChild, ElementRef } from '@angular/core';
import { DialogComponent, ButtonPropsModel, DialogModule } from '@syncfusion/ej2-angular-popups';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Multiple Dialogs Component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['multiple-dialogs.css'],
    templateUrl: 'multiple-dialogs.html',
    standalone: true,
    imports: [ButtonModule, DialogModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class MultipleDialogsDialogComponent {

    constructor() { }

    @ViewChild('defaultDialog')
    public defaultDialog: DialogComponent;

    @ViewChild('dialogObj2')
    public dialogObj: DialogComponent;

    @ViewChild('confirmButton')
    public dialogBtn: ButtonComponent;

    public dialogHeader = 'First Dialog';
    public dialogCloseIcon: Boolean = true;
    public dialogWidth = '330px';
    public contentData = 'This is the first dialog and acts as a parent dialog, you can open the second (child) dialog by clicking \'Next\'.';
    public animationSettings: Object = { effect: 'None' };
    public secondDlgHeader = 'Second Dialog';
    public secondDialogCloseIcon: Boolean = true;
    public secondDialogWidth = '285px';
    public contentData1 = 'This is the second dialog and act as a child dialog.';
    public animationSettings1: Object = { effect: 'None' };
    public isModal: Boolean = true;
    public target = '.control-section';
    public showCloseIcon: Boolean = false;
    public visible: Boolean = true;
    public visible2: Boolean = false;

    public dlgButtonClick = (): void => {
        this.dialogObj.show();
    }

    public dlgButtonClick1 = (): void => {
        this.dialogObj.hide();
    }

    public confirmBtnClick = (): void => {
        this.defaultDialog.show();
    }

    public dialogClose = (): void => {
        this.dialogBtn.element.style.display = 'block';
    }

    public dialogClose2 = (): void => {
        this.dialogBtn.element.style.display = 'none';
    }

    public dialogOpen = (): void => {
        this.dialogBtn.element.style.display = 'none';
    }

    public defaultDlgButtons:  ButtonPropsModel[] = [{ click: this.dlgButtonClick.bind(this), buttonModel: { content: 'Next', isPrimary: true } }];
    public secondDlgButtons:  ButtonPropsModel[] = [{ click: this.dlgButtonClick1.bind(this), buttonModel: { content: 'Close', isPrimary: true } }];

}
