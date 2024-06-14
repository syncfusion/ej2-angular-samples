import { Component, ViewEncapsulation } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService, ContextMenuService, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
/**
 * File Manager sample with IBM Cloud Object Storage service
 */
@Component({
    selector: 'control-content',
    templateUrl: 'ibm-cos-node-file-provider.html',
    styleUrls: ['ibm-cos-node-file-provider.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [NavigationPaneService, ToolbarService, DetailsViewService, ContextMenuService],
    standalone: true,
    imports: [FileManagerModule]
})

export class IBMCOSController {
    public ajaxSettings: object;
    public toolbarSettings: object;
    public contextMenuSettings: object;
    public rootAliasName: string;
    public hostUrl: string = 'https://ej2-ibm-cos-node-file-provider.azurewebsites.net/';
    public ngOnInit(): void {
        this.ajaxSettings = {
            url: this.hostUrl,
            getImageUrl: this.hostUrl + 'GetImage',
            uploadUrl: this.hostUrl + 'Upload',
            downloadUrl: this.hostUrl + 'Download'
        };
        this.rootAliasName = 'Files';
        this.toolbarSettings = { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details',] };
        this.contextMenuSettings = {
            file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
            layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
            visible: true
        }
    }
}
