import { Component, ViewEncapsulation } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
import {AjaxSettingsModel, ContextMenuSettings, SearchSettingsModel , ToolbarSettingsModel} from '@syncfusion/ej2-filemanager';
/**
 * File Manager sample with amazon s3 service
 */
@Component({
    selector: 'control-content',
    templateUrl: 'amazon-s3-file-provider.html',
    styleUrls: ['amazon-s3-file-provider.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [NavigationPaneService, ToolbarService, DetailsViewService],
    standalone: true,
    imports: [FileManagerModule]
})

export class AmazonS3Controller {
    public ajaxSettings: AjaxSettingsModel;
    public contextMenuSettings: object;
    public toolbarSettings: ToolbarSettingsModel;    
    public searchSettings: SearchSettingsModel;
    public hostUrl: string = 'https://amazons3.azurewebsites.net/api/';
    public ngOnInit(): void {
        this.ajaxSettings = {
            url: this.hostUrl + 'AmazonS3Provider/AmazonS3FileOperations',
            getImageUrl: this.hostUrl + 'AmazonS3Provider/AmazonS3GetImage',
            uploadUrl: this.hostUrl + 'AmazonS3Provider/AmazonS3Upload',
            downloadUrl: this.hostUrl + 'AmazonS3Provider/AmazonS3Download'
        };
        this.toolbarSettings = { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details',] };
        this.contextMenuSettings = {
            file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
            layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
            visible: true
        };
        this.searchSettings = {
            allowSearchOnTyping: false
       };
    }
}
