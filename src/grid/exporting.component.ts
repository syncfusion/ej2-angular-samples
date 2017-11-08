import { Component, OnInit, ViewChild, ValueProvider } from '@angular/core';
import { orderDatas } from './data';
import {
    GridComponent, ToolbarService, PageService, ExcelExportService, PdfExportService,
    GroupService
} from '@syncfusion/ej2-ng-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations'

@Component({
    selector: 'control-content',
    templateUrl: 'exporting.html',
    providers: [ToolbarService, PageService, ExcelExportService, PdfExportService, GroupService]

})
export class ExportingComponent implements OnInit {
    public data: Object[];
    public toolbar: string[];
    public pageSettings: Object;
    public groupOptions: { [x: string]: Object } = { showDropArea: false, columns: ['ShipCountry'] };
    @ViewChild('grid')
    public grid: GridComponent;

    public ngOnInit(): void {
        this.data = orderDatas;
        this.toolbar = ['excelexport', 'pdfexport', 'csvexport'];
        this.pageSettings = { pageCount: 5 };
    }
    toolbarClick(args: ClickEventArgs): void {
        switch (args.item.text) {
            case 'PDF Export':
                this.grid.pdfExport();
                break;
            case 'Excel Export':
                this.grid.excelExport();
                break;
            case 'CSV Export':
                this.grid.csvExport();
                break;
        }
    }
}



