import { Component, ViewEncapsulation } from '@angular/core';
import { FileManagerComponent } from '@syncfusion/ej2-angular-filemanager';
/**
 * Data binding Menu Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'custom.html',
    styleUrls: ['custom.css'],
    encapsulation: ViewEncapsulation.None
})

export class CustomThumnailController {
    public ajaxSettings: object;
    public view: string;
    public hostUrl: string = 'https://ng2jq.syncfusion.com/ej2services/';
    public ngOnInit(): void {
        this.ajaxSettings = {
            url: this.hostUrl + 'api/FileManager/FileOperations',
            getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
            uploadUrl: this.hostUrl + 'api/FileManager/Upload',
            downloadUrl: this.hostUrl + 'api/FileManager/Download'
        };
       this.view = "LargeIcons";
       }
}