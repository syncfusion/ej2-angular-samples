import { Component, ViewEncapsulation } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
/**
 * File Manager full functionalities sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'overview.html',
    styleUrls: ['overview.css'],
    encapsulation: ViewEncapsulation.None,
	providers: [ NavigationPaneService, ToolbarService, DetailsViewService]
})

export class OverViewController {
    public ajaxSettings: object;
    public view: string;
    public hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
    public ngOnInit(): void {
        this.ajaxSettings = {
            url: this.hostUrl + 'api/FileManager/FileOperations',
            getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
            uploadUrl: this.hostUrl + 'api/FileManager/Upload',
            downloadUrl: this.hostUrl + 'api/FileManager/Download'
        };
       this.view = "Details";
       }
}