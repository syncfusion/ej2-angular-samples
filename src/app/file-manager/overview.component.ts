import { Component, ViewEncapsulation } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
/**
 * File Manager full functionalities sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'overview.html',
    styleUrls: ['overview.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [NavigationPaneService, ToolbarService, DetailsViewService],
    standalone: true,
    imports: [FileManagerModule]
})

export class OverViewController {
    public ajaxSettings: object;
    public toolbarSettings: object;
    public contextMenuSettings: object;
    public detailsViewSettings: object;
    public view: string;
    public hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
    public ngOnInit(): void {
        this.ajaxSettings = {
            url: this.hostUrl + 'api/FileManager/FileOperations',
            getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
            uploadUrl: this.hostUrl + 'api/FileManager/Upload',
            downloadUrl: this.hostUrl + 'api/FileManager/Download'
        };
        this.toolbarSettings = { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details',] };
        this.contextMenuSettings = {
            file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
            layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
            visible: true
        }
       this.view = "Details";
       this.detailsViewSettings = {
            columns: [
                {
                    field: 'name', headerText: 'Name', customAttributes: { class: 'e-fe-grid-name' }
                },
                {
                    field: '_fm_modified', headerText: 'DateModified', format: 'MM/dd/yyyy hh:mm a'
                },
                {
                    field: 'size', headerText: 'Size', template: '<span class="e-fe-size">${size}</span>', format: 'n2'
                }
            ]
        }
    }
}