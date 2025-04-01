import { Component, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { DialogComponent, ButtonPropsModel, DialogModule } from '@syncfusion/ej2-angular-popups';
import { AnimationSettingsModel } from '@syncfusion/ej2-splitbuttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

/**
 * Default Dialog Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ButtonModule, DialogModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class BasicDialogComponent implements AfterViewInit {
    @ViewChild('Dialog')
    public Dialog: DialogComponent;

    public header: string = 'About SYNCFUSION Succinctly Series';
    public showCloseIcon: Boolean = true;
    public width: string = '500px';
    public animationSettings: AnimationSettingsModel = { effect: 'None' };
    public target: string = '.control-section';

    ngAfterViewInit(): void {
        document.getElementById('dlgbtn').focus();
    }
    // On Dialog close, 'Open' Button will be shown
    public dialogClose = (): void => {
        document.getElementById('dlgbtn').style.display = '';
    }
    // On Dialog open, 'Open' Button will be hidden
    public dialogOpen = (): void => {
        document.getElementById('dlgbtn').style.display = 'none';
    }

    public dlgBtnClick = (): void => {
        window.open('https://www.syncfusion.com/company/about-us');
    }

    public BtnClick = (): void => {
        this.Dialog.show();
    }

    public dlgButtons: ButtonPropsModel[] = [{ click: this.dlgBtnClick.bind(this), buttonModel: { content: 'Learn More', isPrimary: true } }];
}
