import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadGroupService, GridComponent, VirtualScrollService, SortService } from '@syncfusion/ej2-angular-grids';
import { createLazyLoadData, lazyLoadData } from './data';

@Component({
    selector: '',
    templateUrl: 'lazy-load-grouping-with-virtual-scrolling.html',
    providers: [LazyLoadGroupService, VirtualScrollService, SortService]
})
export class LazyLoadGroupingWithVirtualScrollingComponent implements OnInit {
    public lazyLoadData: Object[] = lazyLoadData;
    @ViewChild('grid')
    public grid: GridComponent;
    public groupSettings: object = { enableLazyLoading: true, columns: ['ProductName', 'CustomerName'] };
    public ngOnInit(): void {
        /* create lazyLoadData */
        createLazyLoadData();
    }
}