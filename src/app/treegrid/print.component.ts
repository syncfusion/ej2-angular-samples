import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { ToolbarService, ExcelExportService, PdfExportService, PageService, TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'print.html',
    providers: [ToolbarService, PageService, ExcelExportService, PdfExportService],
    standalone: true,
    imports: [TreeGridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class PrintComponent implements OnInit {
    public data: Object[] = [];
    public toolbar: string[];

    ngOnInit(): void {
        this.data = sampleData;
        this.toolbar = ["Print"];
    }
}