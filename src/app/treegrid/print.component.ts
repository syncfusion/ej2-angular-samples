import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent, ToolbarService, ExcelExportService, PdfExportService, PageService, TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
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
    @ViewChild('treegridprint')
    public treegrid: TreeGridComponent;
    public data: Object[] = [];
    public toolbar: string[];

    ngOnInit(): void {
        this.data = sampleData;
        this.toolbar = ["Print"];
    }
    public onLoad(): void {
        this.treegrid.grid.cssClass = document.querySelector('.fluent2-highcontrast') ? 'e-print-fluent2-highcontrast' : '';
    }
}
