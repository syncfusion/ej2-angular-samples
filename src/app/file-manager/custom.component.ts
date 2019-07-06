import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService} from '@syncfusion/ej2-angular-filemanager';
/**
 * File Manager custom thumbnail sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'custom.html',
    styleUrls: ['custom.css'],
    encapsulation: ViewEncapsulation.None,
	providers: [ NavigationPaneService, ToolbarService, DetailsViewService]
})

export class CustomThumnailController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['custom.css'];
    }
    public ajaxSettings: object;
    public view: string;
    public hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
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