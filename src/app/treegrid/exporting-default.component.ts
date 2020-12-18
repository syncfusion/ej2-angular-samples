import { Component, OnInit , ViewChild} from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent , ToolbarService, PageService, ExcelExportService, PdfExportService} from '@syncfusion/ej2-angular-treegrid';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { DialogUtility } from '@syncfusion/ej2-popups';
@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'exporting-default.html',
    providers: [ ToolbarService, PageService, ExcelExportService, PdfExportService]
})
export class DefaultExportComponent implements OnInit {
    public data: Object[] = [];
    public toolbar: string[];
    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
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
                this.treegrid.pdfExport();
              }
        
                break;
            case this.treegrid.grid.element.id + '_excelexport':
                this.treegrid.excelExport();
                break;
            case this.treegrid.grid.element.id + '_csvexport':
                this.treegrid.csvExport();
                break;
             
        }
    }
}