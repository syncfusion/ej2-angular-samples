import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService } from '@syncfusion/ej2-angular-treegrid';
import {  EditSettingsModel } from '@syncfusion/ej2-treegrid';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'default.contextmenu.html',
    providers: [SortService, ResizeService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService]
})
export class ContextMenuComponent implements OnInit {
    public data: Object[] = [];
    public contextMenuItems: string[];
    public editing: EditSettingsModel;
    public editparams: Object;
    public toolbar: string[];
    public taskidrules: Object;
    public tasknamerules: Object;
    public startdaterules: Object;
    public enddaterules: Object;
    public durationrules: Object;
    public progressrules: Object;
    ngOnInit(): void {
        this.data = sampleData;
        this.contextMenuItems = ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending',
         'Edit', 'Delete', 'Save', 'Cancel',
        'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
        'LastPage', 'NextPage'];
    this.editing = { allowDeleting: true, allowEditing: true };
    this.editparams = { params: { format: 'n' } };
    this.taskidrules = { required: true , number: true};
    this.tasknamerules = { required: true};
    this.startdaterules = { date: true};
    this.enddaterules = { date: true};
    this.durationrules = { number: true , min: 0};
    this.progressrules = { number: true , min: 0};
    }
}