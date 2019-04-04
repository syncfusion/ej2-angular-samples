import { Component, OnInit } from '@angular/core';
import { orderData } from './data';
import { AggregateService } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'ej2-gridaggregate',
    templateUrl: 'aggregate-default.html',
    providers: [AggregateService]
})
export class AggregateComponent implements OnInit {
    public data: Object[];
    public pageOption: Object = {pageCount: 5};

    public ngOnInit(): void {
        this.data = orderData;
    }
}