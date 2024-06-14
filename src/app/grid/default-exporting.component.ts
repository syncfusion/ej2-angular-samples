import { Component, OnInit, ViewChild, ValueProvider, ViewEncapsulation } from '@angular/core';
import { employeeDetails } from './data';
import {
    GridComponent, ToolbarService, FilterService, ExcelExportService, PdfExportService,
    GroupService, ExcelQueryCellInfoEventArgs, PdfQueryCellInfoEventArgs, SortService, GridModule
} from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations'
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'default-exporting.html',
    styleUrls: ['column-template.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, FilterService, ExcelExportService, PdfExportService, GroupService, SortService],
    standalone: true,
    imports: [GridModule, CheckBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ExportingComponent implements OnInit {
    public data: Object[];
    public toolbar: string[];
    public pageSettings: Object;
    public filterSettings: Object;
    public isInitial: Boolean = true;
    @ViewChild('grid')
    public grid: GridComponent;

    public ngOnInit(): void {
        this.data = employeeDetails;
        this.toolbar = ['ExcelExport', 'PdfExport', 'CsvExport'];
        this.pageSettings = { pageCount: 5 };
        this.filterSettings = { type: 'Excel'};
    }
    dataBound() {
        if(this.isInitial) {
            this.grid.toolbarModule.toolbar.hideItem(2, true);
            this.isInitial = false;
        }
    }
    toolbarClick(args: ClickEventArgs): void {
        switch (args.item.id) {
            case 'DefaultExport_pdfexport':
                this.grid.pdfExport();
                break;
            case 'DefaultExport_excelexport':
                this.grid.excelExport();
                break;
            case 'DefaultExport_csvexport':
                this.grid.csvExport();
                break;
        }
    }
    exportQueryCellInfo(args: ExcelQueryCellInfoEventArgs | PdfQueryCellInfoEventArgs): void {
        if (args.column.headerText === 'Employee Image') {
            if ((args as any).name === 'excelQueryCellInfo') {
                args.image = { height: 75, base64: (args as any).data.EmployeeImage, width: 75 };
            } else {
                args.image = { base64: (args as any).data.EmployeeImage };
            }
        }
        if (args.column.headerText === 'Email ID') {
            args.hyperLink = {
                target: 'mailto:' + (args as any).data.EmailID,
                displayText: (args as any).data.EmailID
            };
        }
    }
    public checkboxChange(e: any): void {
        let fields: string[] = ['Employee Image', 'Email ID'];
        if (e.checked) {
            this.grid.showColumns(fields, 'headerText');
            this.grid.toolbarModule.toolbar.hideItem(2, true);
        } else {
            this.grid.hideColumns(fields, 'headerText');
            this.grid.toolbarModule.toolbar.hideItem(2, false);
        }
    }
}



