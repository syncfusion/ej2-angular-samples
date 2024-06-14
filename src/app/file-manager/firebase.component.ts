import { Component, ViewEncapsulation } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
/**
 * File Manager sample with firebase database service
 */
@Component({
    selector: 'control-content',
    templateUrl: 'firebase.html',
    styleUrls: ['firebase.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [NavigationPaneService, ToolbarService, DetailsViewService],
    standalone: true,
    imports: [FileManagerModule]
})

export class FirebaseController {
    public ajaxSettings: object;
    public toolbarSettings: object;
    public contextMenuSettings: object;
    public hostUrl: string = 'https://realtime-firebase.azurewebsites.net/';
    public ngOnInit(): void {
        this.ajaxSettings = {
            url: this.hostUrl + 'api/FirebaseProvider/FirebaseRealtimeFileOperations',
            getImageUrl: this.hostUrl + 'api/FirebaseProvider/FirebaseRealtimeGetImage',
            uploadUrl: this.hostUrl + 'api/FirebaseProvider/FirebaseRealtimeUpload',
            downloadUrl: this.hostUrl + 'api/FirebaseProvider/FirebaseRealtimeDownload'
        };
        this.toolbarSettings = { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details',] };
        this.contextMenuSettings = {
            file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
            layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
            visible: true
        }
    }
}
