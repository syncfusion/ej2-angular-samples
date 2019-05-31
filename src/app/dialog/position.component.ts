import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';

/**
 * Position Dialog Component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['position.css'],
    templateUrl: 'position.html'
})

export class PositioningDialogComponent {
    @ViewChild('ejDialog')
    public defaultDialog: DialogComponent;
    public position: object={ X: 'center', Y: 'center' };
    public closeOnEscape: boolean =false;
    public dialogCloseIcon: boolean =true;
    public defaultWidth: string ='452px';
    public target: string = '.control-section';

    public dlgButtonClick: EmitType<Object> = () => {
        this.defaultDialog.show();
    }

    public onChangeHandler = function (args: any): void {
        this.defaultDialog.position.X = args.value.split(" ")[0];
        this.defaultDialog.position.Y = args.value.split(" ")[1];
        this.defaultDialog.dataBind();
        let txt: string[] = args.event.target.parentElement.querySelector('.e-label').innerText.split(" ");
        document.getElementById("posvalue").innerHTML = 'Position: { X: "' + txt[0] + '", Y: "' + txt[1] + '" }';
    } 

    public dialogOpen: EmitType<Object> = () => {
        document.getElementById('dialogBtn').style.display = 'none';
    }

    public dialogClose: EmitType<Object> = () => {
        document.getElementById('dialogBtn').style.display = 'block';
    }
}