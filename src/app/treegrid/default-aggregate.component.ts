import { Component, OnInit, ViewChild } from '@angular/core';
import { summaryRowData } from './jsontreegriddata';
import {  AggregateService,
  ExcelExportService,
  PdfExportService,
  TreeGridExcelExportProperties,
  TreeGridPdfExportProperties,
  ToolbarService, } from '@syncfusion/ej2-angular-treegrid';
import { FailureEventArgs } from '@syncfusion/ej2-grids';
import { CheckBox, CheckBoxModule, ChangeEventArgs } from '@syncfusion/ej2-angular-buttons';
import { TreeGridComponent, TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { NgClass } from '@angular/common';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DialogUtility } from '@syncfusion/ej2-popups/src/dialog';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'default-aggregate.html',
    providers:[AggregateService,
    ToolbarService,
    ExcelExportService,
    PdfExportService,],
    standalone: true,
    imports: [TreeGridModule, SBActionDescriptionComponent, SBDescriptionComponent, CheckBoxModule, NgClass]
})
export class AggregateComponent implements OnInit {
    public data: Object[] = [];
    @ViewChild('treegrid')
    public treegrid : TreeGridComponent ;
    collapseStatePersist: boolean;
    public toolbar: string[];
  public aggregates:object[];

    ngOnInit(): void {
        this.data = summaryRowData;
        this.toolbar = ['ExcelExport', 'PdfExport', 'CsvExport'];
        this.aggregates =  [{
        columns: [
            {
                type: 'Max',
                field: 'UnitWeight',
                columnName: 'UnitWeight',
                footerTemplate: 'Maximum: ${Max}'
            },
            {
            type: 'Min',
            field: 'TotalUnits',
            columnName: 'TotalUnits',
            footerTemplate: 'Minimum: ${Min}'
        }]
     }]

    }
    public actionFailure (e: FailureEventArgs): void {
   
    }
    
    public toolbarClick(args: ClickEventArgs): void {
    switch (args.item.id) {
        case this.treegrid.grid.element.id + '_pdfexport':
        if (this.treegrid.enableRtl === true && this.treegrid.locale === 'ar') {
            let innercontent: any = 'You need custom fonts to export Arabic characters, refer this'
                 + '<a target="_blank" href="https://ej2.syncfusion.com/angular/documentation/treegrid/pdf-export/#add-custom-font-for-pdf-exporting">'
                 + 'documentation section</a>';
                DialogUtility.alert({content: innercontent});
          }
          else {
            let pdfExportProperties: TreeGridPdfExportProperties = {
                isCollapsedStatePersist: this.collapseStatePersist,
                
            };
            this.treegrid.pdfExport(pdfExportProperties);
          }
    
            break;
        case this.treegrid.grid.element.id + '_excelexport':
            let excelExportProperties: TreeGridExcelExportProperties = {
                isCollapsedStatePersist: this.collapseStatePersist
            };
            this.treegrid.excelExport(excelExportProperties);
            break;
        case this.treegrid.grid.element.id + '_csvexport':
            this.treegrid.csvExport();
            break;
         
    }
}
    public onChange ( args: ChangeEventArgs): void {
        if (args.checked) {
            this.treegrid.aggregates[0].showChildSummary = true;
            this.treegrid.refresh();
         } else {
            this.treegrid.aggregates[0].showChildSummary = false;
            this.treegrid.refresh();
        }
}
}