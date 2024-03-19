import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { customerData, data } from './data';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { SelectionService, RowSelectEventArgs, GridComponent, ToolbarService, ExcelExportService, PdfExportService, ExcelExportProperties, PdfExportProperties, GridModule } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { CheckBoxComponent, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { NgIf } from '@angular/common';

type carType = { CustomerID: string, CustomerName: string, ContactName: string };

@Component({
    selector: 'ejs-gridexport',
    templateUrl: 'multiple-export.html',
    styleUrls: ['master-detail.style.css'],
    providers: [SelectionService, ToolbarService, ExcelExportService, PdfExportService],
    standalone: true,
    imports: [GridModule, NgIf, CheckBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class MultipleExportComponent implements OnInit {
    public data: Object[];
    public key: string = null;
    public names: string[] = ['AROUT', 'BERGS', 'BLONP', 'CHOPS', 'ERNSH'];
    public exportGrids: string[];
    public toolbar: string[];
    public newSheetExcelProperties: ExcelExportProperties = {
        multipleExport: { type: 'NewSheet' }
    };
    public sameSheetPdfProperties: PdfExportProperties = {
        multipleExport: { type: "AppendToPage", blankSpace: 10 }
    };

    @ViewChild('MasterGrid') public masterGrid: GridComponent;

    @ViewChild('DetailGrid') public detailgrid: GridComponent;

    @ViewChild('checkbox') public checkboxObj: CheckBoxComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['master-detail.style.css'];
    }

    public ngOnInit(): void {
        this.data = customerData.filter((e: carType) => this.names.indexOf(e.CustomerID) !== -1);
        this.toolbar = ['ExcelExport', 'PdfExport'];
        this.exportGrids = ['MasterGrid', 'DetailGrid']
    }

    public onRowSelected(args: RowSelectEventArgs): void {
        const queryData: any = args.data;
        this.key = queryData.ContactName;
        const dataSource: object[] = new DataManager(data).executeLocal(new Query().where('CustomerName', 'equal', queryData.ContactName));
        this.detailgrid.dataSource = dataSource.slice(0, 5);
    }

    public toolbarClick(args: ClickEventArgs): void {
        if (this.checkboxObj.checked) {
            switch (args.item.id) {
                case 'MasterGrid_excelexport':
                    this.masterGrid.excelExport({}, true);
                    break;
                case 'MasterGrid_pdfexport':
                    this.masterGrid.pdfExport(this.sameSheetPdfProperties, true);
                    break;
            }
        }
        else {
            switch (args.item.id) {
                case 'MasterGrid_excelexport':
                    this.masterGrid.excelExport(this.newSheetExcelProperties, true);
                    break;
                case 'MasterGrid_pdfexport':
                    this.masterGrid.pdfExport({}, true);
                    break;
            }
        }
    }
}