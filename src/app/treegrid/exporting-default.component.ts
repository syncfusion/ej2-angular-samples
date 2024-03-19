import { Component, OnInit , ViewChild} from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent , TreeGridModule, TreeGridExcelExportProperties, TreeGridPdfExportProperties, ToolbarService, PageService, ExcelExportService, PdfExportService} from '@syncfusion/ej2-angular-treegrid';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { CheckBoxComponent, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'exporting-default.html',
    providers: [ ToolbarService, PageService, ExcelExportService, PdfExportService],
    standalone: true,
    imports: [TreeGridModule, SBActionDescriptionComponent, SBDescriptionComponent, CheckBoxModule]
})
export class DefaultExportComponent implements OnInit {
    public data: Object[] = [];
    public toolbar: string[];
    public collapseStatePersist: boolean = true;
    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    @ViewChild('checkbox')
    public checkbox: CheckBoxComponent;
    ngOnInit(): void {
        this.data = sampleData;
        this.toolbar = ['ExcelExport', 'PdfExport', 'CsvExport'];
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
                    isCollapsedStatePersist: this.collapseStatePersist
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

    public onClick(e: MouseEvent): void {
        if (this.checkbox.checked) {
            this.collapseStatePersist = true;
        } else {
            this.collapseStatePersist = false;
        }

    }
}