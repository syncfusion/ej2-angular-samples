import { Component, ViewEncapsulation } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
/**
 * File Manager sample with firebase database service
 */
@Component({
    selector: 'control-content',
    templateUrl: 'firebase.html',
    styleUrls: ['firebase.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ NavigationPaneService, ToolbarService, DetailsViewService]
})

export class FirebaseController {
    public ajaxSettings: object;
    public hostUrl: string = 'https://realtime-firebase.azurewebsites.net/';
    public ngOnInit(): void {
        this.ajaxSettings = {
            url: this.hostUrl + 'api/FirebaseProvider/FirebaseRealtimeFileOperations',
            getImageUrl: this.hostUrl + 'api/FirebaseProvider/FirebaseRealtimeGetImage',
            uploadUrl: this.hostUrl + 'api/FirebaseProvider/FirebaseRealtimeUpload',
            downloadUrl: this.hostUrl + 'api/FirebaseProvider/FirebaseRealtimeDownload'
        };
    }
}
