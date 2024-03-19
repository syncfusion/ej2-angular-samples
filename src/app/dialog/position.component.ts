import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { DialogComponent, PositionDataModel, DialogModule } from '@syncfusion/ej2-angular-popups';
import { ChangeArgs } from '@syncfusion/ej2-buttons';
import { ButtonComponent, ButtonModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Position Dialog Component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['position.css'],
    templateUrl: 'position.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ButtonModule, DialogModule, RadioButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class PositioningDialogComponent {

    @ViewChild('ejDialog')
    public defaultDialog: DialogComponent;

    @ViewChild('confirmButton')
    public dialogBtn: ButtonComponent;
    public defaultWidth = '452px';
    public position: PositionDataModel = { X: 'center', Y: 'center' };
    public closeOnEscape = false;
    public dialogCloseIcon = true;
    public target = '.control-section';

    public dlgButtonClick = () => {
        this.defaultDialog.show();
    }

    public onChangeHandler = function (args: ChangeArgs): void {
        this.defaultDialog.position.X = args.value.split(' ')[0];
        this.defaultDialog.position.Y = args.value.split(' ')[1];
        this.defaultDialog.dataBind();
        const txt: string[] = ((args.event.target as HTMLElement).parentElement.querySelector('.e-label') as HTMLElement).innerText.split(' ');
        document.getElementById('posvalue').innerHTML = 'Position: { X: "' + txt[0] + '", Y: "' + txt[1] + '" }';
    }

    public dialogOpen = (): void => {
        this.dialogBtn.element.style.display = 'none';
    }

    public dialogClose = (): void => {
        this.dialogBtn.element.style.display = 'block';
    }
}
