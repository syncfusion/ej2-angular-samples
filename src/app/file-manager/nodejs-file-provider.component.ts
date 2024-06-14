import { Component, ViewEncapsulation } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService, ContextMenuService, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
/**
 * File Manager sample with  service
 */
@Component({
    selector: 'control-content',
    templateUrl: 'nodejs-file-provider.html',
    styleUrls: ['nodejs-file-provider.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [NavigationPaneService, ToolbarService, DetailsViewService, ContextMenuService],
    standalone: true,
    imports: [FileManagerModule]
})

export class NodeJSController {
    public ajaxSettings: object;
    public toolbarSettings: object;
    public contextMenuSettings: object;
    public hostUrl: string = 'https://ej2-nodejs-service.azurewebsites.net/';
    public ngOnInit(): void {
        this.ajaxSettings = {
            url: this.hostUrl,
            getImageUrl: this.hostUrl + 'GetImage',
            uploadUrl: this.hostUrl + 'Upload',
            downloadUrl: this.hostUrl + 'Download'
        };
        this.toolbarSettings = { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details',] };
        this.contextMenuSettings = {
            file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
            layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
            visible: true
        }
    }
}
