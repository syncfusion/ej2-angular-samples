import { Component, OnInit , ViewChild} from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent , ToolbarService, PageService, ExcelExportService, PdfExportService} from '@syncfusion/ej2-angular-treegrid';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'default.exporting.html',
    providers: [ ToolbarService, PageService, ExcelExportService, PdfExportService]
})
export class DefaultExportComponent implements OnInit {
    public data: Object[] = [];
    public toolbar: string[];
    public pageSettings: Object;
    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    ngOnInit(): void {
        this.data = sampleData;
        this.toolbar = ['ExcelExport', 'PdfExport', 'CsvExport'];
        this.pageSettings = { pageCount: 5, pageSize: 10 };
    }

    public toolbarClick(args: ClickEventArgs): void {
        switch (args.item.text) {
            case 'PDF Export':
                this.treegrid.pdfExport();
                break;
            case 'Excel Export':
                this.treegrid.excelExport();
                break;
            case 'CSV Export':
                this.treegrid.csvExport();
                break;
        }
    }
}