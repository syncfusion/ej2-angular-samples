import { Component, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DialogComponent, AnimationSettingsModel, DialogModule } from '@syncfusion/ej2-angular-popups';
import { CheckBoxComponent, ButtonModel, ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Modal Dialog Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'modal-dialog.html',
    styleUrls: ['modal-dialog.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ButtonModule, DialogModule, CheckBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class ModalDialogComponent implements AfterViewInit {

    @ViewChild('modalDialog')
    public modalDialog: DialogComponent;

    @ViewChild('overlay')
    public overlay: CheckBoxComponent;

    @ViewChild('modalButton')
    public modalButton: ButtonComponent;

    public target: string = '#modalTarget';
    public width: string = '335px';
    public header: string = 'Software Update';
    public content: string = 'Your current software version is up to date.';
    public isModal: Boolean = true;
    public animationSettings: AnimationSettingsModel = { effect: 'None' };

    ngAfterViewInit(): void {
        this.modalButton.element.focus();
    }
    // On Button click, modal Dialog will be shown
    public modalBtnClick = (): void => {
        this.modalDialog.show();
    }
    // On Dialog close, 'Open' Button will be shown
    public modalDlgClose = (): void => {
        this.modalButton.element.style.display = '';
    }
    // On Dialog open, 'Open' Button will be hidden
    public modalDlgOpen = (): void => {
        this.modalButton.element.style.display = 'none';
    }

    // Close the Dialog, while clicking "OK" Button of Dialog
    public dlgButtonClick = (): void => {
        this.modalDialog.hide();
    }

    public overlayClick = (): void => {
        if (this.overlay.checked) {
            this.modalDialog.hide();
        }
    }

    // Initialize Button to open the modal Dialog
    public buttons: { [key: string]: ButtonModel }[] = [{ click: this.dlgButtonClick.bind(this), buttonModel: { content: 'OK', isPrimary: true } }];
}
