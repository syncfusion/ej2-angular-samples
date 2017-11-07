import { Component, OnInit, ViewChild } from '@angular/core';
import { Ajax } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-ng-popups';
/**
 * Default Dialog Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'ajax.html',
})

export class AjaxDialogComponent implements OnInit{
    @ViewChild('dialog')
    public dialog: DialogComponent;
    public ajaxData: string;
    ngOnInit(): void {
        let ajax: Ajax = new Ajax('./src/dialog/twitter.html', 'GET', true);
        ajax.send().then();
        ajax.onSuccess = (data: string): void => {
            // Loading Dialog content on AJAX success
            this.ajaxData = data;
            this.content=data;         
        };
    }
    // Dialog will be opened on button click
    ajaxBtnClick() {
        this.dialog.show();
    }
    ngAfterViewInit():void{
        document.getElementById('ajaxBtn').focus();
    }
    public header: string = 'Twitter';
    public content: string = this.ajaxData;
    public target: string = '.control-section';
    public showCloseIcon: Boolean = true;
    public ajaxHeight: string = '270px';
    public width: string = '500px';
    public animationSettings: Object = { effect: 'None' };
    // Button will be shown, when Dialog has been closed
    dialogClose() {
        document.getElementById('ajaxBtn').style.display = '';
    }
    // Button will be hidden, when Dialog has been opened
    dialogOpen() {
        document.getElementById('ajaxBtn').style.display = 'none';
    }

    constructor() { }
}




