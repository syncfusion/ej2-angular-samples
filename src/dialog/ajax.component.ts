import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Ajax } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-ng-popups';
/**
 * Default Dialog Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'ajax.html',
    styleUrls: ['ajax.css'],
    encapsulation: ViewEncapsulation.None
})

export class AjaxDialogComponent implements OnInit{
	
    @ViewChild('dialogInstance')
    public dialogObj: DialogComponent;
    public ajaxData: string;
    // Dialog will be opened on button click
    ajaxBtnClick() {
        this.dialogObj.show();
    }
	ngOnInit(): void {}
		
    ngAfterViewInit():void{
        document.getElementById('ajaxBtn').focus();
    }
    public header: string = '<img class="img1" src="src/dialog/images/2.png">Whats Coming from Microsoft this Fall';
    public target: string = '.control-section';
    public showCloseIcon: Boolean = true;
    public ajaxHeight: string = '270px';
    public width: string = '500px';
    public animationSettings: Object = { effect: 'None' };
    public innerContent1: string = 'On October 17, Microsoft will release its Fall Creators Update for the Windows 10 platform.'
    public innerContent2: string= 'Much likeits previous counterpart, the Spring Creators Update ...';
    public contentData: string = 'On October 17, Microsoft will release its Fall Creators Update for the Windows 10 platform.'
    + 'Much likeits previous counterpart, the Spring Creators Update, the release is set to deliver more features'
    + 'to Windows 10 forboth developers and users, with particular emphasis this time around on app modernization'
    + 'mixed reality, and gamedevelopment and software updates App modernization is the term Microsoft used in' 
    + 'its press event toencompass the features that will affect most Windows 10 users and'
    + 'The updates primarily serve to makeusing Windows 10  easier and more productive all around. Some significant highlights include device'
    public content: string = this.innerContent1 + this.innerContent2;
    public dlgButtons: Object[] = [{ click: this.dlgButtonClick.bind(this), buttonModel: { content: 'More Details' } }];
    // Button will be shown, when Dialog has been closed
    dialogClose() {
        document.getElementById('ajaxBtn').style.display = '';
    }
    // Button will be hidden, when Dialog has been opened
    dialogOpen() {
        document.getElementById('ajaxBtn').style.display = 'none';
    }

    dlgButtonClick(): void {
        let localObj: any = this;
    if (document.querySelector('.e-footer-content .e-btn').textContent === 'More Details') {
        // Request to load AJAX content
        let ajax: Ajax = new Ajax('./src/dialog/blog.html', 'GET', true);
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
    constructor() { }
}




