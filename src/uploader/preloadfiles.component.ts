import { Component, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { EmitType, detach } from '@syncfusion/ej2-base';
import { UploaderComponent } from '@syncfusion/ej2-ng-inputs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';

/**
 * Default Uploader Preload File Component
 */
@Component({
    selector: 'control_wrapper',
    templateUrl: 'preloadfiles.html',
    styleUrls: ['preload.css'],
    encapsulation: ViewEncapsulation.None
})
export class PreloadFileUploaderComponent {
    @ViewChild('preloadupload')
    public uploadObj: UploaderComponent;

    public path: Object = {
        saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
    };

    ngAfterViewInit(): void {
        document.getElementById('clearbtn').onclick = () => {
            this.uploadObj.clearAll();
        };
    }

    public dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;

    public onSuccess:  EmitType<Object> = (args: any) => {
        let uploadWrapper: HTMLElement = this.uploadObj.element.closest('.e-upload') as HTMLElement;
        if (args.operation === 'remove') {
            // remove spinner
            hideSpinner(uploadWrapper);
            detach(uploadWrapper.querySelector('.e-spinner-pane'));
        } else {
            let li: HTMLElement = uploadWrapper.querySelector('[data-file-name="' + args.file.name + '"]');
            li.classList.add('e-icon-spinner');
            (li.querySelector('.e-icons') as HTMLElement).onclick = () => {
                this.generateSpinner(uploadWrapper);
            };
            (li.querySelector('.e-icons') as HTMLElement).onkeydown = (e: any) => {
                if (e.keyCode === 13) {
                    this.generateSpinner(e.target.closest('.e-upload'));
                }
            };
        }
    }

    public onFailure:  EmitType<Object> = (args: any) => {
        let li: HTMLElement = this.uploadObj.element.closest('.e-upload').querySelector('[data-file-name="' + args.file.name + '"]');
        li.classList.add('e-icon-spinner');
    }

    public onRemove:  EmitType<Object> = (args: any) => {
        let uploadWrapper: HTMLElement = this.uploadObj.element.closest('.e-upload') as HTMLElement;
        let li: HTMLElement = uploadWrapper.querySelector('[data-file-name="' + args.filesData[0].name + '"]');
        if (li.classList.contains('e-icon-spinner')) { return; }
        this.generateSpinner(uploadWrapper);
    }

    public generateSpinner:  EmitType<Object> = (targetElement: HTMLElement) => {
        createSpinner({ target: targetElement, width: '25px' });
        showSpinner(targetElement);
    }
}