import { Component, ViewEncapsulation } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import {AjaxSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-filemanager';
/**
 * File Manager sample with amazon s3 service
 */
@Component({
    selector: 'control-content',
    templateUrl: 'amazon-s3-file-provider.html', 
    styleUrls: ['amazon-s3-file-provider.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ NavigationPaneService, ToolbarService, DetailsViewService]
})

export class AmazonS3Controller {
    public ajaxSettings: AjaxSettingsModel;
    public searchSettings: SearchSettingsModel;
    public hostUrl: string = 'https://amazons3.azurewebsites.net/api/';
    public ngOnInit(): void {
        this.ajaxSettings = {
            url: this.hostUrl + 'AmazonS3Provider/AmazonS3FileOperations',
            getImageUrl: this.hostUrl + 'AmazonS3Provider/AmazonS3GetImage',
            uploadUrl: this.hostUrl + 'AmazonS3Provider/AmazonS3Upload',
            downloadUrl: this.hostUrl + 'AmazonS3Provider/AmazonS3Download'
        };
        this.searchSettings = {
            allowSearchOnTyping: false
       };
    }
}
