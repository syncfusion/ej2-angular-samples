import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadGroupService, GridComponent, InfiniteScrollService, SortService } from '@syncfusion/ej2-angular-grids';
import { createLazyLoadData, lazyLoadData } from './data';

@Component({
    selector: '',
    templateUrl: 'lazy-load-grouping-with-infinite-scrolling.html',
    providers: [LazyLoadGroupService, InfiniteScrollService, SortService]
})
export class LazyLoadGroupingWithInfiniteScrollingComponent implements OnInit {
    public lazyLoadData: Object[] = lazyLoadData;
    @ViewChild('grid')
    public grid: GridComponent;
    public groupSettings: object = { enableLazyLoading: true, columns: ['ProductName', 'CustomerName'] };
    public ngOnInit(): void {
        /* create lazyLoadData */
        createLazyLoadData();
    }
}