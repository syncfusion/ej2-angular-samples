import { Component, OnInit, ViewChild } from '@angular/core';
import { orderDatas, employeeData } from './data';
import { ToolbarService, GridComponent, ExcelExportService, PdfExportService } from '@syncfusion/ej2-ng-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations'

@Component({
    selector: 'control-content',
    templateUrl: 'advance-exporting.html',
    providers: [ToolbarService, ExcelExportService, PdfExportService]

})
export class AdvanceExportingComponent implements OnInit {
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
                let firstGridExcelExport: Promise<any> = this.firstGrid.excelExport(this.getExcelExportProperties(), true);
                firstGridExcelExport.then((bookData: any) => {
                    this.secondGrid.excelExport(this.getExcelExportProperties(), false, bookData);
                });
                break;
            /* tslint:enable */
            case 'PDF Export':
                let firstGridPdfExport: Promise<Object> = this.firstGrid.pdfExport(this.getPdfExportProperties(), true);
                firstGridPdfExport.then((pdfData: Object) => {
                    this.secondGrid.pdfExport(this.getPdfExportProperties(), false, pdfData);
                });
                break;
        }
    }

    /* tslint:disable-next-line:no-any */
    private getExcelExportProperties(): any {
        return {
            header: {
                headerRows: 7,
                rows: [
                    {
                        cells: [
                            {
                                colSpan: 6,
                                value: 'Northwind Traders',
                                style: { fontColor: '#C67878', fontSize: 20, hAlign: 'center', bold: true, }
                            }]
                    },
                    {
                        cells: [
                            {
                                colSpan: 6,
                                value: '2501 Aerial Center Parkway',
                                style: { fontColor: '#C67878', fontSize: 15, hAlign: 'center', bold: true, }
                            }]
                    },
                    {
                        cells: [
                            {
                                colSpan: 6,
                                value: 'Suite 200 Morrisville, NC 27560 USA',
                                style: { fontColor: '#C67878', fontSize: 15, hAlign: 'center', bold: true, }
                            }]
                    },
                    {
                        cells: [
                            {
                                colSpan: 6,
                                value: 'Tel +1 888.936.8638 Fax +1 919.573.0306',
                                style: { fontColor: '#C67878', fontSize: 15, hAlign: 'center', bold: true, }
                            }]
                    },
                    {
                        cells: [
                            {
                                colSpan: 6,
                                hyperlink: { target: 'https://www.northwind.com/', displayText: 'www.northwind.com' },
                                style: { hAlign: 'center' }
                            }]
                    },
                    {
                        cells: [
                            {
                                colSpan: 6,
                                hyperlink: { target: 'mailto:support@northwind.com' },
                                style: { hAlign: 'center' }
                            }]
                    },
                ]
            },
            footer: {
                footerRows: 4,
                rows: [
                    {
                        cells: [
                            {
                                colSpan: 6,
                                value: 'Thank you for your business!',
                                style: { hAlign: 'center', bold: true }
                            }]
                    },
                    {
                        cells: [
                            {
                                colSpan: 6,
                                value: '!Visit Again!',
                                style: { hAlign: 'center', bold: true }
                            }]
                    }
                ]
            },
        };
    }
    /* tslint:disable-next-line:no-any */
    private getPdfExportProperties(): any {
        return {
            header: {
                fromTop: 0,
                height: 120,
                contents: [
                    {
                        type: 'line',
                        style: { penColor: '#000000', penSize: 1, dashStyle: 'solid' },
                        points: { x1: 25, y1: 4, x2: 800, y2: 4 }
                    },
                    {
                        type: 'line',
                        style: { penColor: '#000000', penSize: 1, dashStyle: 'solid' },
                        points: { x1: 25, y1: 100, x2: 800, y2: 100 }
                    },
                    {
                        type: 'text',
                        value: 'Northwind Traders',
                        position: { x: 300, y: 20 },
                        style: { textBrushColor: '#C67878', fontSize: 14 }
                    },
                    {
                        type: 'text',
                        value: '2501 Aerial Center Parkway',
                        position: { x: 280, y: 45 },
                        style: { textBrushColor: '#C67878', fontSize: 14 }
                    },
                    {
                        type: 'text',
                        value: 'Tel +1 888.936.8638 Fax +1 919.573.0306',
                        position: { x: 240, y: 70 },
                        style: { textBrushColor: '#C67878', fontSize: 14 }
                    },
                ]
            },
            footer: {
                fromBottom: 160,
                height: 100,
                contents: [
                    {
                        type: 'line',
                        style: { penColor: '#000000', penSize: 1, dashStyle: 'solid' },
                        points: { x1: 25, y1: 4, x2: 800, y2: 4 }
                    },
                    {
                        type: 'line',
                        style: { penColor: '#000000', penSize: 1, dashStyle: 'solid' },
                        points: { x1: 25, y1: 60, x2: 800, y2: 60 }
                    },
                    {
                        type: 'text',
                        value: '!! Thank you !!',
                        position: { x: 300, y: 20 },
                        style: { textBrushColor: '#C67878', fontSize: 14 }
                    }
                ]
            }
        };
    }
}