import { Component, OnInit } from '@angular/core';
import { categoryData } from './data';
import { AggregateService, GroupService } from '@syncfusion/ej2-ng-grids';

@Component({
    selector: 'ej2-gridaggregategroup',
    templateUrl: 'aggregategroup.html',
    providers: [AggregateService, GroupService]
})
export class AggregateGroupComponent implements OnInit {
    public data: Object[];
    public groupSettings: { [x: string]: Object } = { showDropArea: false, columns: ['CategoryName'] };

    public ngOnInit(): void {
        this.data = categoryData;
    }
}