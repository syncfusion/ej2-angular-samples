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
    public header: string = 'الحوار';
    public content: string = '<div>انقر فوق موافق للمتابعة أو انقر فوق عدم الموافقة على إلغاء التثبيت والانتهاء.</div>';
    public showCloseIcon: Boolean = true;
    public width: string = '300px';
    public enableRtl: Boolean = true;
    public animationSettings: Object = { effect: 'None' };
    public hide: any;
    ngAfterViewInit():void{
        document.getElementById('rtlbtn').focus();
    }
    dialogClose() {
        document.getElementById('rtlbtn').style.display = '';
    }
    dialogOpen() {
        document.getElementById('rtlbtn').style.display = 'none';
    }

    public rtlDlgButtons: Object[] = [{ click: this.rtlDlgBtnClick, buttonModel: { content: 'يوافق على', cssClass: 'e-flat', isPrimary: true } }, { click: this.rtlDlgBtnClick, buttonModel: { cssClass: 'e-flat', content: 'تعارض' } }];
    rtlDlgBtnClick() {
        this.hide();
    }
    public target: string = '.control-section';
    constructor() { }

}