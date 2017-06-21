import { Component, OnInit, Inject } from '@angular/core';
import { data } from './data';
import { SortService } from '@syncfusion/ej2-ng-grids';

@Component({
    selector: 'ej2-gridsort',
    templateUrl: 'sorting.html',
    styleUrls: ['sort.style.css'],
    providers: [SortService]
})
export class SortComponent implements OnInit {
    public data: Object[];
    public initialSort: Object;
    public pageSettings: Object;

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['sort.style.css'];
    }

    public ngOnInit(): void {
        this.data = data;
        this.initialSort = {
            columns: [{ field: 'Freight', direction: 'ascending' },
            { field: 'CustomerName', direction: 'descending' }]
        };
        this.pageSettings = { pageCount: 8 }
    }
}