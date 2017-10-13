import { Component, OnInit, ViewChild } from '@angular/core';
import { orderDatas, employeeData } from './data';
import { ToolbarService, GridComponent, ExcelExportService, PdfExportService } from '@syncfusion/ej2-ng-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations'

@Component({
    selector: 'control-content',
    templateUrl: 'multiple-exporting.html',
    providers: [ToolbarService, ExcelExportService, PdfExportService]

})
export class MultipleExportingComponent implements OnInit {
    public firstGridData: Object[];
    public secondGridData: Object[];
    public toolbar: string[];
    @ViewChild('firstgrid')
    public firstGrid: GridComponent;

    @ViewChild('secondgrid')
    public secondGrid: GridComponent;

    public ngOnInit(): void {
        this.firstGridData = orderDatas.slice(0, 5);
        this.secondGridData = employeeData.slice(0, 5);
        this.toolbar = ['excelexport', 'pdfexport'];
    }
    toolbarClick(args: ClickEventArgs): void {
        switch (args.item.text) {
            /* tslint:disable */
            case 'Excel Export':
                let firstGridExcelExport: Promise<any> = this.firstGrid.excelExport({}, true);
                firstGridExcelExport.then((bookData: any) => {
                    this.secondGrid.excelExport({}, false, bookData);
                });
                break;
            /* tslint:enable */
            case 'PDF Export':
                let firstGridPdfExport: Promise<Object> = this.firstGrid.pdfExport({}, true);
                firstGridPdfExport.then((pdfData: Object) => {
                    this.secondGrid.pdfExport({}, false, pdfData);
                });
                break;
        }
    }
}