import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService } from '@syncfusion/ej2-angular-treegrid';
import {  EditSettingsModel } from '@syncfusion/ej2-treegrid';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'contextmenu-default.html',
    providers: [SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService]
    
})
export class ContextMenuComponent implements OnInit {
    public data: Object[] = [];
    public pageSettings: Object;
    public contextMenuItems: string[] = [];
    public editing: EditSettingsModel;
    public toolbar: string[];
    public editparams: Object;

    ngOnInit(): void {
        this.data = sampleData;
        this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',
         'Edit', 'Delete', 'Save', 'Cancel',
        'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
        'LastPage', 'NextPage'];
    this.editing = { allowDeleting: true, allowEditing: true, mode: 'Row' };
    this.pageSettings= { pageSize: 10 };
    this.editparams = {params: { format: 'n' }};


    }
}