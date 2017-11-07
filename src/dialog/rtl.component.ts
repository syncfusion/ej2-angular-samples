import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-ng-popups';

/**
 * Default Dialog Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'rtl.html',
})
export class RTLDialogComponent {
    @ViewChild('rtlDialog')
    public rtlDialog: DialogComponent;
    rtlBtnClick() {
        this.rtlDialog.show();
    }
    public header: string = 'Delete File';
    public content: string = '<div>Are you sure you want to delete sea.jpg?</div>';
    public showCloseIcon: Boolean = true;
    public width: string = '300px';
    public enableRtl: Boolean = true;
    public animationSettings: Object = { effect: 'None' };
    public hide: any;
    ngAfterViewInit():void{
        document.getElementById('rtlbtn').focus();
    }
    // On Dialog close, 'Open' Button will be shown
    dialogClose() {
        document.getElementById('rtlbtn').style.display = '';
    }
    // On Dialog open, 'Open' Button will be hidden
    dialogOpen() {
        document.getElementById('rtlbtn').style.display = 'none';
    }

    public rtlDlgButtons: Object[] = [{ click: this.rtlDlgBtnClick, buttonModel: { content: 'Yes', cssClass: 'e-flat', isPrimary: true } }, { click: this.rtlDlgBtnClick, buttonModel: { cssClass: 'e-flat', content: 'No' } }];
    rtlDlgBtnClick() {
        this.hide();
    }
    public target: string = '.control-section';
    constructor() { }

}