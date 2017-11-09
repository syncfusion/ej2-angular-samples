import { Component, ViewChild, OnInit } from '@angular/core';
import { data } from './data';
import { GridComponent, FilterService, FilterType } from '@syncfusion/ej2-ng-grids';

@Component({
    selector: 'ej-gridfiltermenu',
    templateUrl: 'filtermenu.html',
    styleUrls: ['filter.style.css'],
    providers: [FilterService]
})
export class FilteringMenuComponent implements OnInit {
    public data: Object[];
    public pageSettings: Object;
    public filterSettings: Object;

    @ViewChild('grid')
    public grid: GridComponent;

    ngOnInit(): void {
        this.data = data.slice(0, 200);
        this.pageSettings = { pageCount: 8 };
        this.filterSettings = { type: 'menu' };
    }
    public onChange(e: string): void {
        this.grid.filterSettings.type = <FilterType>e;
        this.grid.clearFiltering();
    }
}