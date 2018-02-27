import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-ng-popups';

/**
 * Default Dialog Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
})
export class BasicDialogComponent {
    @ViewChild('Dialog')
    public Dialog: DialogComponent;
    BtnClick() {
        this.Dialog.show();
    }
    public header: string = 'About SYNCFUSION Succinctly Series';
    public content: string = '<p>In the Succinctly series, Syncfusion created a robust, free library of more than 130 technical e-books formatted for PDF, Kindle, and EPUB. <br>'
    + '<br> The Succinctly series was born in 2012 out of a desire to provide concise technical e-books for software developers'
    + 'Each title in the Succinctly series is written by a carefully chosen expert and provides essential content in about 100 pages.</p>'
    public showCloseIcon: Boolean = true;
    public width: string = '50%';
    public animationSettings: Object = { effect: 'None' };
    public hide: any;
    ngAfterViewInit():void{
        document.getElementById('dlgbtn').focus();
    }
    // On Dialog close, 'Open' Button will be shown
    dialogClose() {
        document.getElementById('dlgbtn').style.display = '';
    }
    // On Dialog open, 'Open' Button will be hidden
    dialogOpen() {
        document.getElementById('dlgbtn').style.display = 'none';
    }

    public dlgButtons: Object[] = [{ click: this.dlgBtnClick, buttonModel: { content: 'LEARN ABOUT SYNCFUSION, INC' } }];
    dlgBtnClick() {
        window.open('https://www.syncfusion.com/company/about-us');
    }
    public target: string = '.control-section';
    constructor() { }

}