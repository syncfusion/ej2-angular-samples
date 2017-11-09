import { Component, OnInit } from '@angular/core';
import { SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService } from '@syncfusion/ej2-ng-grids';
import { ContextMenuItem, GroupSettingsModel, EditSettingsModel } from '@syncfusion/ej2-ng-grids';
import { data } from './data';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'contextmenu.html',
    providers: [SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService]
})
export class ContextMenuComponent implements OnInit {
    public data: Object[];
    public contextMenuItems: ContextMenuItem[];
    public editing: EditSettingsModel;
    ngOnInit(): void {
        this.data = data.slice(0, 60);
        this.contextMenuItems = ['autoFit', 'autoFitAll', 'sortAscending', 'sortDescending',
            'copy', 'edit', 'delete', 'save', 'cancel',
            'pdfExport', 'excelExport', 'csvExport', 'firstPage', 'prevPage',
            'lastPage', 'nextPage'];
        this.editing = { allowDeleting: true, allowEditing: true };
    }
}