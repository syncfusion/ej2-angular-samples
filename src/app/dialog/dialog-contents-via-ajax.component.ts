import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Ajax } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
/**
 * Ajax Dialog Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'dialog-contents-via-ajax.html',
    styleUrls: ['dialog-contents-via-ajax.css'],
    encapsulation: ViewEncapsulation.None
})

export class AjaxDialogComponent implements OnInit{
	
    @ViewChild('dialogInstance')
    public dialogObj: DialogComponent;
    public ajaxData: string;
    // Dialog will be opened on button click
    public ajaxBtnClick: EmitType<object> = () => {
        this.dialogObj.show();
    }
	ngOnInit(): void {}
		
    ngAfterViewInit(): void {
        document.getElementById('ajaxBtn').focus();
    }
    public header: string = '';
    public target: string = '.control-section';
    public showCloseIcon: Boolean = true;
    public ajaxHeight: string = '270px';
    public width: string = '500px';
    public animationSettings: Object = { effect: 'None' };
    public innerContent1: string = 'On October 17, Microsoft will release its Fall Creators Update for the Windows 10 platform.'
    public innerContent2: string= 'Much likeits previous counter part, the Spring Creators Update ...';
    public content: string = this.innerContent1 + this.innerContent2;
    public contentData: string = 'On October 17, Microsoft will release its Fall Creators Update for the Windows 10 platform. '
    + 'like its previous counterpart, the Spring Creators Update, the release is set to deliver more features '
    + 'to Windows 10 for both developers and users, with particular emphasis this time around on app modernization, '
    + 'mixed reality, and game development and software updates. App modernization is the term Microsoft used in ' 
    + 'its press event to encompass the features that will affect most Windows 10 users and developers.';
    // Button will be shown, when Dialog has been closed
    public dialogClose: EmitType<object> = () => {
        document.getElementById('ajaxBtn').style.display = '';
    }
    // Button will be hidden, when Dialog has been opened
    public dialogOpen: EmitType<object> = () => {
        document.getElementById('ajaxBtn').style.display = 'none';
    }

    public dlgButtonClick: EmitType<object> = () => {
        let localObj: any = this;
        if (document.querySelector('.e-footer-content .e-btn').textContent === 'More Details') {
            // Request to load AJAX content
            let ajax: Ajax = new Ajax('./assets/dialog/blog.html', 'GET', true);
            // Rendering Dialog on AJAX success
            ajax.onSuccess = (data: string): void => {
                this.dialogObj.content = data;
            };
            ajax.send();
            
            document.querySelector('.e-footer-content .e-btn').textContent = 'Less Details';
            localObj.height = '250px';
        } else {
            this.dialogObj.content = this.contentData;
             document.querySelector('.e-footer-content .e-btn').textContent = 'More Details';
        }
    }
    public dlgButtons: Object[] = [{ click: this.dlgButtonClick.bind(this), buttonModel: { content: 'More Details', isPrimary: true } }];
    constructor() { }
}




