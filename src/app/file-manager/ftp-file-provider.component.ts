import { Component, ViewEncapsulation } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
/**
 * File Manager sample with File Tansfer Protocol
 */
@Component({
    selector: 'control-content',
    templateUrl: 'ftp-file-provider.html',
    styleUrls: ['ftp-file-provider.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [NavigationPaneService, ToolbarService, DetailsViewService],
    standalone: true,
    imports: [FileManagerModule]
})

export class FTPController {
    public ajaxSettings: object;
    public toolbarSettings: object;
    public contextMenuSettings: object;
    public hostUrl: string = 'https://ej2-ftp-aspcore-service.azurewebsites.net/';
    public ngOnInit(): void {
        this.ajaxSettings = {
            url: this.hostUrl + 'api/FTPProvider/FTPFileOperations',
            getImageUrl: this.hostUrl + 'api/FTPProvider/FTPGetImage',
            uploadUrl: this.hostUrl + 'api/FTPProvider/FTPUpload',
            downloadUrl: this.hostUrl + 'api/FTPProvider/FTPDownload'
        };
        this.toolbarSettings = { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details',] };
        this.contextMenuSettings = {
            file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
            layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
            visible: true
        }
    }
}
