import { Component, OnInit } from '@angular/core';
import { SortService, ResizeService, GroupService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService } from '@syncfusion/ej2-ng-grids';
import { ContextMenuItem, GroupSettingsModel, EditSettingsModel } from '@syncfusion/ej2-ng-grids';
import { data } from './data';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'contextmenu.html',
    providers: [SortService, ResizeService, GroupService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService]
})
export class ContextMenuComponent implements OnInit {
    public data: Object[];
    public contextMenuItems: ContextMenuItem[];
    public groupOptions: GroupSettingsModel;
    public editing: EditSettingsModel;
    ngOnInit(): void {
        this.data = data.slice(0, 60);
        this.contextMenuItems = ['sortAscending', 'sortDescending', 'group', 'ungroup',
            'autoFit', 'autoFitAll', 'copy', 'edit', 'delete', 'save', 'cancel',
            'pdfExport', 'excelExport', 'csvExport', 'firstPage', 'prevPage',
            'lastPage', 'nextPage'];
        this.groupOptions = { showGroupedColumn: true };
        this.editing = { allowDeleting: true, allowEditing: true };
    }
}