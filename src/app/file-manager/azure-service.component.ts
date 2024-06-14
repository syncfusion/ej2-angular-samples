import { Component, ViewEncapsulation } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
/**
 * File Manager sample with azure service
 */
@Component({
    selector: 'control-content',
    templateUrl: 'azure-service.html',
    styleUrls: ['azure-service.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [NavigationPaneService, ToolbarService, DetailsViewService],
    standalone: true,
    imports: [FileManagerModule]
})

export class AzureController {
    public ajaxSettings: object;
    public toolbarSettings: object;
    public contextMenuSettings: object;
    public hostUrl: string = 'https://ej2-azure-aspcore-service.azurewebsites.net/';
    public ngOnInit(): void {
        this.ajaxSettings = {
            url: this.hostUrl + 'api/AzureFileManager/AzureFileOperations',
            getImageUrl: this.hostUrl + 'api/AzureFileManager/AzureGetImage',
            uploadUrl: this.hostUrl + 'api/AzureFileManager/AzureUpload',
            downloadUrl: this.hostUrl + 'api/AzureFileManager/AzureDownload'
        };
        this.toolbarSettings = { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details',] };
        this.contextMenuSettings = {
            file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
            layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
            visible: true
        }
    }
}
