import { Component, OnInit, ViewChild } from '@angular/core';
import { inventoryData } from './data';
import { GroupService, SortService, GridComponent } from '@syncfusion/ej2-ng-grids';


@Component({
    selector: 'ej-gridgroup',
    templateUrl: 'grouping.html',
    providers: [GroupService, SortService]
})
export class GroupComponent implements OnInit {
    public data: Object[];
    public groupOptions: Object;
    public pageSettings: Object;
    public refresh: Boolean;
    @ViewChild('grid')
    public grid: GridComponent;
    ngOnInit(): void {
        this.data = inventoryData;
        this.groupOptions = { showGroupedColumn: false, columns: ['Country'] };
        this.pageSettings = { pageCount: 5 };
    }
    dataBound() {
        if(this.refresh){
            this.grid.groupColumn('Country');
            this.refresh =false;
        }
    }
    load() {
        this.refresh = (<any>this.grid).refreshing;
    }
}