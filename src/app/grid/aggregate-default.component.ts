import { Component, OnInit } from '@angular/core';
import { orderData } from './data';
import { AggregateService, SortService, GridModule, PageService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-gridaggregate',
    templateUrl: 'aggregate-default.html',
    providers: [AggregateService, SortService, PageService],
    standalone: true,
    imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AggregateComponent implements OnInit {
    public data: Object[];
    public pageOption: Object = {pageCount: 5};
    public ngOnInit(): void {
        this.data = orderData;
    }
}