import { Component, OnInit, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { employeeData } from './data';
import {
    GridComponent, DetailRowService, PdfExportService,
    ExcelExportService, ToolbarService, ExportDetailTemplateEventArgs, SortService, FilterService, GridModule
} from '@syncfusion/ej2-angular-grids';

import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { Internationalization } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

let instance: Internationalization = new Internationalization();

@Component({
    selector: 'ej2-griddetailtemplateexporting',
    templateUrl: 'detail-template-exporting.html',
    styleUrls: ['detail-template-exporting.style.css'],
    providers: [DetailRowService, PdfExportService, ExcelExportService, ToolbarService, SortService, FilterService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class DetailTemplateExportComponent implements OnInit {
    public data: any;
    public toolbar: string[];
    public filterSettings: Object;
    @ViewChild('grid')
    public grid: GridComponent;
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['detail-template-exporting.style.css'];
    }

    ngOnInit(): void {
        this.data = employeeData;
        this.toolbar = ['ExcelExport', 'PdfExport'];
        this.filterSettings = { type: 'Excel'};
    }

    public format(value: Date): string {
        return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
    }

    toolbarClick(args: ClickEventArgs): void {
        if (args.item.id === 'DetailTemplateExport_excelexport') {
            this.grid.excelExport({ hierarchyExportMode: 'All' });
        }
        if (args.item.id === 'DetailTemplateExport_pdfexport') {
            this.grid.pdfExport({ hierarchyExportMode: 'All' });
        }
    }

    exportDetailTemplate(args: ExportDetailTemplateEventArgs): void {
        args.value = {
            columnCount: 3,
            rows: [
                {
                    cells: [
                        {
                            index: 0,
                            rowSpan: 4,
                            image:
                                args.action === 'excelexport'
                                    ? {
                                        base64: args.parentRow.data['EmployeeImage'],
                                        height: 80,
                                        width: 80,
                                    }
                                    : { base64: args.parentRow.data['EmployeeImage'] },
                        },
                        {
                            index: 1,
                            value: 'First Name: ' + args.parentRow.data['FirstName'],
                        },
                        {
                            index: 2,
                            value: 'Postal Code: ' + args.parentRow.data['PostalCode'],
                        },
                    ],
                },
                {
                    cells: [
                        {
                            index: 1,
                            value: 'Last Name: ' + args.parentRow.data['LastName'],
                        },
                        { index: 2, value: 'City: ' + args.parentRow.data['City'] },
                    ],
                },
                {
                    cells: [
                        { index: 1, value: 'Title: ' + args.parentRow.data['Title'] },
                        { index: 2, value: 'Phone: ' + args.parentRow.data['HomePhone'] },
                    ],
                },
                {
                    cells: [
                        { index: 1, value: 'Address: ' + args.parentRow.data['Address'] },
                        {
                            index: 2,
                            value:
                                'HireDate: ' + this.format(args.parentRow.data['HireDate']),
                        },
                    ],
                }
            ]
        };
    }
}

export interface DateFormat extends Window {
    format?: Function;
}