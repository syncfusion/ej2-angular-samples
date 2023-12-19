import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';

/**
 * File Manager API sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None,
	providers: [ NavigationPaneService, ToolbarService, DetailsViewService]
})

export class DefaultFileController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default.css'];
    }
    @ViewChild('fileObj')
    public fileObj: FileManagerComponent;
    public ajaxSettings: object;
    public toolbarSettings: object;
    public contextMenuSettings: object;
    public navigationPaneSettings: object;
    public items: string[] = ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Download', 'Delete', 'Refresh', 'Selection', 'View', 'Details'];
    public waterMark: string = 'Select item';
    public hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
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
        this.toolbarSettings = { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details',] };
        this.contextMenuSettings = {
            layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
            visible: true
        };
    }

    toolClick(args: any) {
        if (args.event.currentTarget.id == 'toolbar') {
            this.fileObj.toolbarSettings.visible = args.checked;
        }
        if (args.event.currentTarget.id == 'multiSelect') {
            this.fileObj.allowMultiSelection = args.checked;
        }
        if (args.event.currentTarget.id == 'fileExtension') {
            this.fileObj.showFileExtension = args.checked;
        }
        if (args.event.currentTarget.id == 'thumbnail') {
            this.fileObj.showThumbnail = args.checked;
        }
    }
    itemChange(args: any) {
        var changedItem = args.itemData.value;
        if (args.element.id == 'enable') {
            this.fileObj.enableToolbarItems([changedItem]);
        } else {
            this.fileObj.disableToolbarItems([changedItem]);
        }
    }
}
