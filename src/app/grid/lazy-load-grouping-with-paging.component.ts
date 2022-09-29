import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadGroupService, GridComponent, SortService } from '@syncfusion/ej2-angular-grids';
import { createLazyLoadData, lazyLoadData } from './data';

@Component({
    selector: 'ej2-gridlazyload-group',
    templateUrl: 'lazy-load-grouping-with-paging.html',
    providers: [LazyLoadGroupService, SortService]
})
export class LazyLoadGroupingWithPagingComponent implements OnInit {
    public lazyLoadData: Object[] = lazyLoadData;
    @ViewChild('grid')
    public grid: GridComponent;
    public groupSettings: object = { enableLazyLoading: true, columns: ['ProductName', 'CustomerName'] };
    public ngOnInit(): void {
        /* create lazyLoadData */
        createLazyLoadData();
    }
}