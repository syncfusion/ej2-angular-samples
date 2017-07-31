import { Component, OnInit } from '@angular/core';
import { orderData } from './data';
import { AggregateService } from '@syncfusion/ej2-ng-grids';

@Component({
    selector: 'ej2-gridaggregate',
    templateUrl: 'aggregatedefault.html',
    providers: [AggregateService]
})
export class AggregateComponent implements OnInit {
    public data: Object[];

    public ngOnInit(): void {
        this.data = orderData;
    }
}