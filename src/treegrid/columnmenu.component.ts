import { Component, OnInit } from '@angular/core';
import { FilterService, PageService, SortService, ResizeService, ColumnMenuService } from '@syncfusion/ej2-angular-treegrid';
import { sampleData } from './jsontreegriddata';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'columnmenu.html',
    providers: [FilterService, PageService, SortService, ResizeService, ColumnMenuService],
})
export class ColumnMenuComponent implements OnInit {
    public data: Object[] = [];
    public filterSettings: Object;
    public pageSettings: Object;

    ngOnInit(): void {
        this.data = sampleData;
        this.filterSettings = { type: 'Menu'};
        this.pageSettings = { pageSize: 10 };
    }
}
