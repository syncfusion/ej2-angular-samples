import { Component, OnInit } from '@angular/core';
import { SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService } from '@syncfusion/ej2-angular-grids';
import { ContextMenuItem, GroupSettingsModel, EditSettingsModel } from '@syncfusion/ej2-angular-grids';
import { orderDetails } from './data';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'context-menu.html',
    providers: [SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService]
})
export class ContextMenuComponent implements OnInit {
    public data: Object[];
    public contextMenuItems: ContextMenuItem[];
    public editing: EditSettingsModel;
    ngOnInit(): void {
        this.data = orderDetails;
        this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',
            'Copy', 'Edit', 'Delete', 'Save', 'Cancel',
            'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
            'LastPage', 'NextPage'];
        this.editing = { allowDeleting: true, allowEditing: true };
    }
}