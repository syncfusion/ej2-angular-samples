import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-ng-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';

/**
 * Default Dialog Component
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
    public proxy: any =this;
    BtnClick() {
        this.Dialog.show();
    }
    public footer: string= ' <input id="inVal" class="e-input" type="text" placeholder="Enter your message here!"/>'
     + '<button id="sendButton" class="e-control e-btn e-primary sendButton" data-ripple="true">' + 'Send</button>' ;
    
     public header: string = '<img class="img2" src="src/dialog/images/1.png" alt="header image">'
    +'<div title="Nancy" class="e-icon-settings e-icons" style="padding: 3px;"> Nancy </div>';
    
    public showCloseIcon: Boolean = true;

    public height: string = '85%';
    
    public content: string = '<div class="dialogContent">'
    + '<span class="dialogText">Greetings Nancy! When will you share me the source files of the project?</span></div>'
    
    public target: string = '.control-section';
    
    public animationSettings: Object = { effect: 'None' };
    
    public width: string = '300px';

    dialogClose() {
        document.getElementById('dlgbtn').style.display = '';
    }

    dialogOpen() {
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

    updateTextValue () : void {
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