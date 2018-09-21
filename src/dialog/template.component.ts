import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';

/**
 * Template Dialog Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None
})
export class TemplateDialogComponent {
    @ViewChild('template')
    public Dialog: DialogComponent;
    public proxy: any = this;
    public BtnClick: EmitType<object> = () => {
        this.Dialog.show();
    }

    public showCloseIcon: Boolean = true;

    public height: string = '75%';
    
    public target: string = '.control-section';
    
    public animationSettings: Object = { effect: 'None' };
    
    public width: string = '435px';

    public dialogClose: EmitType<object> = () => {
        document.getElementById('dlgbtn').style.display = '';
    }

    public dialogOpen: EmitType<object> = () => {
        document.getElementById('dlgbtn').style.display = 'none';
        (document.getElementById('sendButton') as any).keypress = (e: any) => {
            if (e.keyCode === 13) { this.updateTextValue(); }
        };    
        (document.getElementById('inVal')as HTMLElement).onkeydown = (e: any) => {
            if (e.keyCode === 13) { this.updateTextValue(); }
        };    
        document.getElementById('sendButton').onclick = (): void => {
            this.updateTextValue();
        };
    }

    public updateTextValue: EmitType<object> = () => {
        let enteredVal: HTMLInputElement = document.getElementById('inVal') as HTMLInputElement;
        let dialogTextElement: HTMLElement = document.getElementsByClassName('dialogText')[0] as HTMLElement;
        let dialogTextWrap : HTMLElement = document.getElementsByClassName('dialogContent')[0] as HTMLElement;
        if (!isNullOrUndefined(document.getElementsByClassName('contentText')[0])) {
            detach(document.getElementsByClassName('contentText')[0]);
        }
        if (enteredVal.value !== '') {
            dialogTextElement.innerHTML = enteredVal.value;
        }
        enteredVal.value = '';
    }
    constructor() { }
}