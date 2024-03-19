import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { EmitType, detach } from '@syncfusion/ej2-base';
import { UploaderComponent, SelectedEventArgs, FileInfo, RemovingEventArgs, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Default Uploader Validation Component
 */
@Component({
    selector: 'control_wrapper',
    templateUrl: 'file-validation.html',
    styleUrls: ['file-validation.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [UploaderModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ValidateUploaderComponent {
    @ViewChild('fileupload')
    public uploadObj: UploaderComponent;

    public path: Object = {
        saveUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Remove'
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

    public onFileRemove(args: RemovingEventArgs): void {
        args.postRawFile = false;
    }

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['upload-save-action.cs', 'upload-remove-action.cs'];
    }
}