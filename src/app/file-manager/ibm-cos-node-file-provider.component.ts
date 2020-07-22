import { Component, ViewEncapsulation } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService, ContextMenuService } from '@syncfusion/ej2-angular-filemanager';
/**
 * File Manager sample with IBM Cloud Object Storage service
 */
@Component({
    selector: 'control-content',
    templateUrl: 'ibm-cos-node-file-provider.html',
    styleUrls: ['ibm-cos-node-file-provider.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ NavigationPaneService, ToolbarService, DetailsViewService, ContextMenuService]
})

export class IBMCOSController {
    public ajaxSettings: object;
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
    }
}
