import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
import { DropDownListModule, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

/**
 * File Manager API sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [NavigationPaneService, ToolbarService, DetailsViewService],
    standalone: true,
    imports: [FileManagerModule, CheckBoxModule, DropDownListModule]
})

export class DefaultFileController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default.css'];
    }
    @ViewChild('fileObj')
    public fileObj: FileManagerComponent;
    @ViewChild('enableDdl')
    public enableDropDownList: DropDownListComponent;
    @ViewChild('disableDdl')
    public disableDropDownList: DropDownListComponent;
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
			file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
            layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
            visible: true
        };
    }

    toolClick(args: any) {
        if (args.event.currentTarget.id == 'toolbar') {
            this.fileObj.toolbarSettings.visible = args.checked;
        }
        if (args.event.currentTarget.id == 'fileExtension') {
            this.fileObj.showFileExtension = args.checked;
        }
        if (args.event.currentTarget.id == 'thumbnail') {
            this.fileObj.showThumbnail = args.checked;
        }
        if (args.event.currentTarget.id == 'rangeSelection') {
            this.fileObj.enableRangeSelection = args.checked;
        }
    }
  
    onDisableItemChange(args: any) {
        if (args.itemData != null) {
            this.fileObj.disableToolbarItems([args.itemData.value]);
            if (args.value === this.enableDropDownList.value) {
                this.enableDropDownList.value = null;
            }
        }
    }
  
    onEnableItemChange(args: any) {
        if (args.itemData != null) {
            this.fileObj.enableToolbarItems([args.itemData.value]);
            if (args.value === this.disableDropDownList.value) {
                this.disableDropDownList.value = null;
            }
        }
    }
}
