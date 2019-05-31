import { Component, OnInit, ViewChild, ValueProvider } from '@angular/core';
import { orderDetails } from './data';
import {
    GridComponent, ToolbarService, PageService, ExcelExportService, PdfExportService,
    GroupService
} from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations'

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'default-exporting.html',
    providers: [ToolbarService, PageService, ExcelExportService, PdfExportService, GroupService]

})
export class ExportingComponent implements OnInit {
    public data: Object[];
    public toolbar: string[];
    public pageSettings: Object;
    public groupOptions: { [x: string]: Object } = { showDropArea: false, columns: ['ShipCountry'] };
    public refresh: Boolean;
    @ViewChild('grid')
    public grid: GridComponent;

    public ngOnInit(): void {
        this.data = orderDetails;
        this.toolbar = ['ExcelExport', 'PdfExport', 'CsvExport'];
        this.pageSettings = { pageCount: 5 };
    }
    dataBound() {
        if(this.refresh){
            this.grid.groupColumn('ShipCountry');
            this.refresh =false;
        }
    }
    load() {
        this.refresh = (<any>this.grid).refreshing;
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



