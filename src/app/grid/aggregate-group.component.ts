import { Component, OnInit, ViewChild } from '@angular/core';
import { categoryData } from './data';
import { AggregateService, GroupService, GridComponent, SortService, GridModule, PageService, FilterService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';


@Component({
    selector: 'ej2-gridaggregategroup',
    templateUrl: 'aggregate-group.html',
    providers: [AggregateService, GroupService, SortService, PageService, FilterService],
    standalone: true,
    imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AggregateGroupComponent implements OnInit {
    public data: Object[];
    public pageOption: Object = { pageCount: 5 };
    public filterSettings: Object;
    public groupSettings: { [x: string]: Object } = { showDropArea: false, columns: ['CategoryName'] };
    public refresh: Boolean;
    @ViewChild('grid')
    public grid: GridComponent;

    public ngOnInit(): void {
        this.data = categoryData;
        this.filterSettings = { type: 'Excel'};
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