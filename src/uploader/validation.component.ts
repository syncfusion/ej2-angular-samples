import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { EmitType, detach } from '@syncfusion/ej2-base';
import { UploaderComponent, SelectedEventArgs, FileInfo } from '@syncfusion/ej2-ng-inputs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';

/**
 * Default Uploader Validation Component
 */
@Component({
    selector: 'control_wrapper',
    templateUrl: 'validation.html',
    styleUrls: ['validate.css'],
    encapsulation: ViewEncapsulation.None
})
export class ValidateUploaderComponent {
    @ViewChild('fileupload')
    public uploadObj: UploaderComponent;

    public path: Object = {
        saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
    };

    public dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;

    public allowExtensions: string = '.doc, .docx, .xls, .xlsx';

    public onSelected(args : SelectedEventArgs) : void {
        args.filesData.splice(5);
        let filesData : FileInfo[] = this.uploadObj.getFilesData();
        let allFiles : FileInfo[] = filesData.concat(args.filesData);
        if (allFiles.length > 5) {
            for (let i : number = 0; i < allFiles.length; i++) {
                if (allFiles.length > 5) {
                    allFiles.shift();
                }
            }
            args.filesData = allFiles;
            args.modifiedFilesData = args.filesData;
        }
        args.isModified = true;
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