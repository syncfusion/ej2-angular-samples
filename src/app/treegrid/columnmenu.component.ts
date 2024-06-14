import { Component, OnInit } from '@angular/core';
import { FilterService, PageService, SortService, ResizeService, TreeGridAllModule,  ColumnMenuService } from '@syncfusion/ej2-angular-treegrid';
import { sampleData } from './jsontreegriddata';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'columnmenu.html',
    providers: [FilterService, PageService, SortService, ResizeService, ColumnMenuService],
    standalone: true,
    imports: [TreeGridAllModule, SBActionDescriptionComponent, SBDescriptionComponent]
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
