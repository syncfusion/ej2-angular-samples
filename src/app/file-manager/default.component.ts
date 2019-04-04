import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FileManagerComponent, LargeIconsView, NavigationPane, DetailsView, Toolbar, ContextMenu, BreadCrumbBar, NavigationPaneSettingsModel  } from '@syncfusion/ej2-angular-filemanager';

/**
 * Default FileManager Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None
})

export class DefaultFileController {
    @ViewChild('fileObj')
    public fileObj: FileManagerComponent;
    public ajaxSettings: object;
    public navigationPaneSettings: object;
    public hostUrl: string = 'https://ng2jq.syncfusion.com/ej2services/';
    public ngOnInit(): void {
        this.ajaxSettings = {
            url: this.hostUrl + 'api/FileManager/FileOperations',
            getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
            uploadUrl: this.hostUrl + 'api/FileManager/Upload',
            downloadUrl: this.hostUrl + 'api/FileManager/Download'

        };
        this.navigationPaneSettings = {
             visible: false
        };
    }

    toolClick(args: any) {
        if (!args.checked) {
            this.fileObj.toolbarSettings.visible = false;
        } else {
            this.fileObj.toolbarSettings.visible = true;

        }
    }
}