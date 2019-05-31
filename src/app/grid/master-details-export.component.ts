import { Component, OnInit, ViewChild } from '@angular/core';
import { hierarchyOrderdata, customerData, employeeData } from './data';
import { GridModel, GridComponent, DetailRowService, PdfExportService,
    ExcelExportService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

@Component({
    selector: 'ej2-grid-masterdetailexport',
    templateUrl: 'master-details-export.html',
    providers: [DetailRowService, PdfExportService, ExcelExportService, ToolbarService]
})
export class HierarchyExportComponent implements OnInit {
    public data: Object[] = [];
    public toolbar: string[];
    public childGrid: GridModel;
    @ViewChild('grid')
    public grid: GridComponent;

    ngOnInit(): void {
        this.data = employeeData;
        this.toolbar = ['PdfExport', 'ExcelExport'];
        this.childGrid = {
            dataSource: hierarchyOrderdata,
            queryString: 'EmployeeID',
            columns: [
                { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
                { field: 'ShipCity', headerText: 'Ship City', width: 120 },
                { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2', textAlign: 'Right' },
                { field: 'ShipName', headerText: 'Ship Name', width: 150 }
            ],
            childGrid: {
                dataSource: customerData,
                queryString: 'CustomerID',
                columns: [
                    { field: 'CustomerID', headerText: 'Customer ID', width: 75 },
                    { field: 'ContactName', headerText: 'Name', width: 100 },
                    { field: 'Address', headerText: 'Address', width: 120 },
                    { field: 'Country', headerText: 'Country', width: 100 }
                ]
            }
        };
    }
    toolbarClick(args: ClickEventArgs): void {
        if (args.item.text === 'Excel Export') {
            this.grid.excelExport({hierarchyExportMode: 'All'});
        }
        if (args.item.text === 'PDF Export') {
            this.grid.pdfExport({hierarchyExportMode: 'All'});
        }
    }
}