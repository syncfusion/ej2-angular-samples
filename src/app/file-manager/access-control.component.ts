import { Component, ViewEncapsulation } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
/**
 * File Manager full functionalities sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'access-control.html',
    styleUrls: ['access-control.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ NavigationPaneService, ToolbarService, DetailsViewService]
})

export class AccessControlController {
    public ajaxSettings: object;
    public hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
    public ngOnInit(): void {
        this.ajaxSettings = {
            url: this.hostUrl + 'api/FileManagerAccess/FileOperations',
            getImageUrl: this.hostUrl + 'api/FileManagerAccess/GetImage',
            uploadUrl: this.hostUrl + 'api/FileManagerAccess/Upload',
            downloadUrl: this.hostUrl + 'api/FileManagerAccess/Download'
        };

    }
}