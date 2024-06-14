import { Component, ViewEncapsulation } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService, VirtualizationService, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
/**
 * File Manager virtualization feature sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'virtualization.html',
    styleUrls: ['virtualization.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [NavigationPaneService, ToolbarService, DetailsViewService, VirtualizationService],
    standalone: true,
    imports: [FileManagerModule]
})

export class VirtualizationController {
    public ajaxSettings: object;
    public toolbarSettings: object;
    public contextMenuSettings: object;
    public view: string;
    public hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
    public ngOnInit(): void {
        this.ajaxSettings = {
            url: this.hostUrl + 'api/Virtualization/FileOperations',
            getImageUrl: this.hostUrl + 'api/Virtualization/GetImage',
            uploadUrl: this.hostUrl + 'api/Virtualization/Upload',
            downloadUrl: this.hostUrl + 'api/Virtualization/Download'
        };
        this.toolbarSettings = { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'View', 'Details',] };
        this.contextMenuSettings = {
            file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
            layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
            visible: true
        }
        this.view = "Details";
    }
}