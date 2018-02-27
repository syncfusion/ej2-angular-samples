import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { EmitType, detach } from '@syncfusion/ej2-base';
import { UploaderComponent } from '@syncfusion/ej2-ng-inputs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { CheckBoxComponent } from '@syncfusion/ej2-ng-buttons';

/**
 * Default Uploader Default Component
 */
@Component({
    selector: 'control_wrapper',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None
})
export class DefaultUploaderComponent {
    @ViewChild('defaultupload')
    public uploadObj: UploaderComponent;
    @ViewChild('checkbox')
    public checkboxObj: CheckBoxComponent;

    public path: Object = {
        saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
    };

    public dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;

    public changeHandler: EmitType<Object> = () => {
        this.uploadObj.autoUpload = this.checkboxObj.checked;
        if (this.uploadObj.element.closest('.e-upload').querySelector('.e-spinner-pane')) {
            detach((this.uploadObj.element.closest('.e-upload').querySelector('.e-spinner-pane')));
        }
        this.uploadObj.clearAll();
    }

    public onSuccess:  EmitType<Object> = (args: any) => {
        let uploadWrapper: HTMLElement = this.uploadObj.element.closest('.e-upload') as HTMLElement;
        let li: HTMLElement = uploadWrapper.querySelector('[data-file-name="' + args.file.name + '"]');
        if (args.operation === 'upload') {
            (li.querySelector('.e-file-delete-btn') as HTMLElement).onclick = () => {
                this.generateSpinner(uploadWrapper);
            };
            (li.querySelector('.e-file-delete-btn') as HTMLElement).onkeydown = (e: any) => {
                if (e.keyCode === 13) {
                    this.generateSpinner(e.target.closest('.e-upload'));
                }
            };
        } else {
            hideSpinner(uploadWrapper);
            detach(uploadWrapper.querySelector('.e-spinner-pane'));
        }
    }

    public generateSpinner(targetElement: HTMLElement): void {
        createSpinner({ target: targetElement, width: '25px' });
        showSpinner(targetElement);
    }
}