import { Component, ViewEncapsulation } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
/**
 * File Manager sample with azure service
 */
@Component({
    selector: 'control-content',
    templateUrl: 'azure-service.html',
    styleUrls: ['azure-service.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ NavigationPaneService, ToolbarService, DetailsViewService]
})

export class AzureController {
    public ajaxSettings: object;
    public hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
    public ngOnInit(): void {
        this.ajaxSettings = {
            url: this.hostUrl + 'api/AzureFileManager/AzureFileoperations',
            getImageUrl: this.hostUrl + 'api/AzureFileManager/AzureGetImage',
            uploadUrl: this.hostUrl + 'api/AzureFileManager/AzureUpload',
            downloadUrl: this.hostUrl + 'api/AzureFileManager/AzureDownload'
        };
    }
}
