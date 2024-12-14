import { Component, OnInit } from '@angular/core';
import { OverallData } from './data';
import { AggregateService, SortService, FilterService, ToolbarService, EditService, GridModule, PageService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-gridaggregate',
    templateUrl: 'aggregate-default.html',
    providers: [AggregateService, SortService, PageService, FilterService, ToolbarService, EditService],
    standalone: true,
    imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AggregateComponent implements OnInit {
    public data: Object[];
    public filterSettings: Object;
    public gridLines: string;
    public ngOnInit(): void {
        this.data = OverallData;
        this.filterSettings = { type: 'Excel' };
        this.gridLines = 'Vertical';
    }
}
