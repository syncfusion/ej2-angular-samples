import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DialogComponent, ButtonPropsModel, DialogModule } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

/**
 * Animation Dialog Component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['animation.css'],
    templateUrl: 'animation.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ButtonModule, DialogModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class AnimationDialogComponent {
    @ViewChild('defaultDialog')
    public defaultDialog: DialogComponent;
    public dialogHeader: string = 'Animation Dialog';
    public dialogCloseIcon: Boolean = true;
    public dialogWidth: string = '285px';
    public animationSettings: Object = { effect: 'Zoom' };
    public isModal: Boolean = true;
    public target: string = '.control-section';
    public showCloseIcon: Boolean = false;
    public visible: Boolean = true;

    public dlgButtonClick = (): void => {
        this.defaultDialog.hide();
    }

    public dialogBtnClick: EmitType<Object> = (args: any) => {
        const effects = args.target.id;
        let txt = args.target.parentElement.innerText;
        txt = (txt === 'Zoom In/Out') ? 'Zoom In or Out' : txt;
        this.defaultDialog.content = 'The dialog is configured with animation effect. It is opened or closed with "' + txt + '" animation.';
        this.defaultDialog.animationSettings = { effect: effects, duration: 400 };
        this.defaultDialog.show();
    }

    public defaultDlgButtons:  ButtonPropsModel[] = [
        { click: this.dlgButtonClick.bind(this), buttonModel: { content: 'Hide', isPrimary: true } }
    ];

    constructor() { }
}
