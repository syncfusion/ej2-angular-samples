import { Component, OnInit, ViewChild } from '@angular/core';
import { categoryData } from './data';
import { AggregateService, GroupService, GridComponent } from '@syncfusion/ej2-angular-grids';


@Component({
    selector: 'ej2-gridaggregategroup',
    templateUrl: 'aggregate-group.html',
    providers: [AggregateService, GroupService]
})
export class AggregateGroupComponent implements OnInit {
    public data: Object[];
    public pageOption: Object = { pageCount: 5 };
    public groupSettings: { [x: string]: Object } = { showDropArea: false, columns: ['CategoryName'] };
    public refresh: Boolean;
    @ViewChild('grid')
    public grid: GridComponent;

    public ngOnInit(): void {
        this.data = categoryData;
    }
    dataBound() {
        if (this.refresh) {
            this.grid.groupColumn('CategoryName');
            this.refresh = false;
        }
    }
    load() {
        this.refresh = (<any>this.grid).refreshing;
    }
}