import { Component, OnInit } from '@angular/core';
import { SortService, ResizeService, PageService, EditService, ExcelExportService, FilterService, PdfExportService, ContextMenuService, GridModule } from '@syncfusion/ej2-angular-grids';
import { ContextMenuItem, GroupSettingsModel, EditSettingsModel } from '@syncfusion/ej2-angular-grids';
import { orderDetails } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'context-menu.html',
    providers: [SortService, ResizeService, PageService, EditService, FilterService, ExcelExportService, PdfExportService, ContextMenuService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class ContextMenuComponent implements OnInit {
    public data: Object[];
    public contextMenuItems: ContextMenuItem[];
    public editing: EditSettingsModel;
    public filterSettings: Object;
    ngOnInit(): void {
        this.data = orderDetails;
        this.filterSettings = { type: 'Excel'};
        this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',
            'Copy', 'Edit', 'Delete', 'Save', 'Cancel',
            'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
            'LastPage', 'NextPage'];
        this.editing = { allowDeleting: true, allowEditing: true };
    }
}