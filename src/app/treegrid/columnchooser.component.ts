import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridComponent, PageService, ColumnChooserService, ToolbarService} from '@syncfusion/ej2-angular-treegrid';
import {PageSettingsModel } from '@syncfusion/ej2-angular-grids';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'columnchooser.html',
    providers: [ PageService, ColumnChooserService, ToolbarService ]

})
export class ColumnChooserComponent implements OnInit {
    public data: Object[] = [];
    public pageSettings: PageSettingsModel;
    public toolbar: string[];


    ngOnInit(): void {
        this.data = sampleData;
        this.pageSettings = { pageSize: 10 };
        this.toolbar = ['ColumnChooser'];
    }
}
