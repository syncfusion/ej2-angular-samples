import { Component, OnInit } from '@angular/core';
import { inventoryData } from './data';
import { GroupService, SortService } from '@syncfusion/ej2-ng-grids';

@Component({
    selector: 'ej-gridgroup',
    templateUrl: 'grouping.html',
    providers: [GroupService, SortService]
})
export class GroupComponent implements OnInit {
    public data: Object[];
    public groupOptions: Object;

    ngOnInit(): void {
        this.data = inventoryData;
        this.groupOptions = { showGroupedColumn: false, columns: ['Country'] };
    }
}