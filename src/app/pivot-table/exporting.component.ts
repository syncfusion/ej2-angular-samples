import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IDataOptions, PivotView, FieldListService, IDataSet, PivotViewModule, ExcelExportService, ConditionalFormattingService, ExcelExportProperties, PdfExportProperties, PDFExportService} from '@syncfusion/ej2-angular-pivotview';
import { DropDownListComponent, DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple } from '@syncfusion/ej2-base';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
enableRipple(false);

/**
 * Pivot Table Exporting Sample.
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'exporting.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['exporting.css'],
    providers: [FieldListService, ExcelExportService, ConditionalFormattingService, PDFExportService],
    standalone: true,
    imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, DropDownListModule, ButtonModule]
})

export class ExportingComponent implements OnInit {
    public dataSourceSettings: IDataOptions;
    public gridSettings: GridSettings;
    public options: { [key: string]: Object }[] = [
        { value: 'pdf', text: 'PDF' },
        { value: 'excel', text: 'Excel' },
        { value: 'csv', text: 'CSV' }
    ];
    public today: string = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });

    @ViewChild('pivotview')
    public pivotObj: PivotView;
    @ViewChild('export')
    public exportBtn: ButtonComponent;
    @ViewChild('exporttype')
    public exportType: DropDownListComponent;

    ngOnInit(): void {
        this.gridSettings = {
            columnWidth: 140
        } as GridSettings;

        document.getElementById('export').onclick = () => {
            if (this.exportType.value === 'Excel') {
                let excelExportProperties: ExcelExportProperties = {
                    header: {
                        headerRows: 4,
                        rows: [
                            { cells: [{ colSpan: 10, value: "Sales Performance Report - Q1 2026", style: { fontColor: '#1B4965', fontSize: 20, hAlign: 'Center', bold: true } }] },
                            { cells: [{ colSpan: 10, value: "Region: Global | Currency: USD", style: { fontColor: '#35B65A', fontSize: 15, hAlign: 'Center', bold: true } }] }
                        ]
                    },
                    footer: {
                        footerRows: 4,
                        rows: [
                            { cells: [{ colSpan: 10, value: "Total In Stock: 1,863 | Total Units Sold: 6,327 | Total Sold Amount: $2,381,015", style: { fontColor: '#35B65A', fontSize: 15, hAlign: 'Center', bold: true } }] },
                            { cells: [{ colSpan: 10, value: `Report generated on: ${this.today}`, style: { fontColor: '#1B4965', fontSize: 15, hAlign: 'Center', bold: true } }] }
                        ]
                    }
                };
                this.pivotObj.excelExport(excelExportProperties);
            } else if (this.exportType.value === 'CSV') {
                this.pivotObj.csvExport();
            } else {
                let pdfExportProperties: PdfExportProperties = {
                    header: {
                        fromTop: 0,
                        height: 130,
                        contents: [
                            {
                                type: 'Text',
                                value: 'Sales Performance Report - Q1 2026',
                                position: { x: 275, y: 30 },
                                style: { textBrushColor: '#1B4965', fontSize: 35 }
                            },
                            {
                                type: 'Text',
                                value: 'Region: Global | Currency: USD',
                                position: { x: 385, y: 80 },
                                style: { textBrushColor: '#35B65A', fontSize: 22 }
                            }
                        ]
                    },
                    footer: {
                        fromBottom: 160,
                        height: 150,
                        contents: [
                            {
                                type: 'Text',
                                value: "Total In Stock: 1,863 | Total Units Sold: 6,327 | Total Sold Amount: $2,381,015",
                                position: { x: 275, y: 0 },
                                style: { textBrushColor: '#35B65A', fontSize: 18 }
                            },
                            {
                                type: 'Text',
                                value: `Report generated on: ${this.today}`,
                                position: { x: 385, y: 25 },
                                style: { textBrushColor: '#1B4965', fontSize: 18 }
                            },
                            {
                                type: 'PageNumber',
                                pageNumberType: 'Numeric',
                                format: 'Page {$current} of {$total}',
                                position: { x: 915, y: 120 },
                                style: { textBrushColor: '#1B4965', fontSize: 20 }
                            }
                        ]
                    }
                };
                this.pivotObj.pdfExport(pdfExportProperties);
            }
        };

        this.dataSourceSettings = {
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
            enableSorting: true,
            rows: [{ name: 'Country' }, { name: 'Products' }],
            formatSettings: [
                { name: 'Amount', format: 'C0' },
                { name: 'In_Stock', format: 'N0' },
                { name: 'Sold', format: 'N0' },
            ],
            columns: [{ name: 'Year', expandAll: true }, { name: 'Quarter' }],
            dataSource: Pivot_Data,
            expandAll: false,
            conditionalFormatSettings: [
                {
                    measure: 'In_Stock',
                    value1: 120,
                    conditions: 'LessThan',
                    style: {
                        backgroundColor: '#FF005C',
                        color: 'white',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    },
                    applyGrandTotals: false
                },
                {
                    value1: 150,
                    measure: 'In_Stock',
                    conditions: 'GreaterThan',
                    style: {
                        backgroundColor: '#35B65A',
                        color: 'white',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    },
                    applyGrandTotals: false
                },
                {
                    measure: 'Sold',
                    value1: 1000,
                    conditions: 'LessThan',
                    style: {
                        backgroundColor: '#FF005C',
                        color: 'white',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    },
                    applyGrandTotals: false
                },
                {
                    value1: 1100,
                    measure: 'Sold',
                    conditions: 'GreaterThan',
                    style: {
                        backgroundColor: '#35B65A',
                        color: 'white',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    },
                    applyGrandTotals: false
                },
                {
                    measure: 'Amount',
                    value1: 7000,
                    conditions: 'LessThan',
                    style: {
                        backgroundColor: '#FF005C',
                        color: 'white',
                        fontFamily: 'Tahoma',
                        fontSize: '12px'
                    },
                    applyGrandTotals: false
                },
                {
                    value1: 12000,
                    measure: 'Amount',
                    conditions: 'GreaterThan',
                    style: {
                        backgroundColor: '#35B65A',
                        color: 'white',
                        fontFamily: 'Segoe UI',
                        fontSize: '12px'
                    },
                    applyGrandTotals: false
                }
            ],
            drilledMembers: [{ name: 'Country', items: ['France'] }],
            filterSettings: [
                { name: 'Year', type: 'Include', items: ['FY 2026'] },
                { name: 'Products', type: 'Include', items: ['Gloves', 'Fenders'] },
            ]
        };
    }
}