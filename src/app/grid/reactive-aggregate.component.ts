import { Component, OnInit } from '@angular/core';
import { orderData } from './data';
import { AggregateService, GroupService, EditService, ToolbarService, SortService, GridModule, PageService, FilterService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-gridaggregate',
    templateUrl: 'reactive-aggregate.html',
    providers: [AggregateService, GroupService, EditService, ToolbarService, SortService, PageService, FilterService],
    standalone: true,
    imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ReactiveAggregateComponent implements OnInit {
    public data: Object[];
    public pageOption: Object;
    public groupSettings: { [x: string]: Object } = { showDropArea: false, columns: ['CustomerID'] };
    public editSettings: Object;
    public toolbar : string[];
    public filterSettings: Object;

    public ngOnInit(): void {
        this.data = orderData;
        this.pageOption = {pageCount: 5};
        this.filterSettings = { type: 'Excel'};
        this.editSettings = { allowEditing: true, allowDeleting: true, mode: 'Batch' };
        this.toolbar = ['Delete', 'Update', 'Cancel'];
    }
}