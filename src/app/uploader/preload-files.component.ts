import { Component, ViewChild, AfterViewInit, ViewEncapsulation, Inject } from '@angular/core';
import { EmitType, detach } from '@syncfusion/ej2-base';
import { UploaderComponent, RemovingEventArgs, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Default Uploader Preload File Component
 */
@Component({
    selector: 'control_wrapper',
    templateUrl: 'preload-files.html',
    styleUrls: ['preload-files.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [UploaderModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class PreloadFileUploaderComponent {
    @ViewChild('preloadupload')
    public uploadObj: UploaderComponent;

    public path: Object = {
        saveUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Remove'
    };

    ngAfterViewInit(): void {
        document.getElementById('clearbtn').onclick = () => {
            this.uploadObj.clearAll();
        };
    }

    public onFileRemove(args: RemovingEventArgs): void {
        args.postRawFile = false;
    }

    public dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['upload-save-action.cs', 'upload-remove-action.cs'];
    }
}