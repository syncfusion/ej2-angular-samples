import { Component, ViewEncapsulation } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

/**
 * File Manager sequential upload feature sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'sequential-upload.html',
    encapsulation: ViewEncapsulation.None,
    providers: [NavigationPaneService, ToolbarService, DetailsViewService],
    standalone: true,
    imports: [FileManagerModule]
})
export class SequentialUploadController {
    public ajaxSettings: any;
    public uploadSettings: any;
    public hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';

    public ngOnInit(): void {
        this.ajaxSettings = {
            url: this.hostUrl + 'api/FileManager/FileOperations',
            getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
            uploadUrl: this.hostUrl + 'api/FileManager/Upload',
            downloadUrl: this.hostUrl + 'api/FileManager/Download'
        };
        this.uploadSettings = {
            sequentialUpload: true, directoryUpload: true
        };
    }
}