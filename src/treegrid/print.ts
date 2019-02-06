import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { ToolbarService, ExcelExportService, PdfExportService, PageService } from '@syncfusion/ej2-angular-treegrid';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'print.html',
    providers: [ToolbarService, PageService, ExcelExportService, PdfExportService]
})
export class PrintComponent implements OnInit {
    public data: Object[] = [];
    public toolbar: string[];

    ngOnInit(): void {
        this.data = sampleData;
        this.toolbar = ["Print"];
    }
}