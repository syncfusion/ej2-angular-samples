import { Component, ViewEncapsulation } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService, ContextMenuService } from '@syncfusion/ej2-angular-filemanager';
/**
 * File Manager sample with  service
 */
@Component({
    selector: 'control-content',
    templateUrl: 'sql-server-provider.html',
    styleUrls: ['sql-server-provider.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ NavigationPaneService, ToolbarService, DetailsViewService, ContextMenuService]
})

export class SQLController {
    public ajaxSettings: object;
    public hostUrl: string = 'https://ng2jq.syncfusion.com/ej2-sql-service/';
    public ngOnInit(): void {
        this.ajaxSettings = {
            url: this.hostUrl + 'api/FileManager/Fileoperations',
            getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
            uploadUrl: this.hostUrl + 'api/FileManager/Upload',
            downloadUrl: this.hostUrl + 'api/FileManager/Download'
        };
    }
}
