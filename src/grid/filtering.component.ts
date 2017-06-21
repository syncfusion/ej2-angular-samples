import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { categoryData } from './data';
import { FilterService, GridComponent } from '@syncfusion/ej2-ng-grids';

@Component({
    selector: 'ej2-gridfilter',
    templateUrl: 'filtering.html',
    styleUrls: ['filter.style.css'],
    providers: [FilterService]
})
export class FilterComponent implements OnInit {
    public data: Object[];
    public pageOptions: Object;
    public category: string[];

    @ViewChild('grid')
    public grid: GridComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['filter.style.css'];
    }

    public ngOnInit(): void {
        this.data = categoryData;
        this.pageOptions = { pageSize: 10 };
        this.category = ['All', 'Beverages', 'Condiments', 'Confections', 'Dairy Products', 'Grains/Cereals',
            'Meat/Poultry', 'Produce', 'Seafood'];
    }

    public onChange(value: string): void {
        if (value === 'All') {
            this.grid.clearFiltering();
        } else {
            this.grid.filterByColumn('CategoryName', 'equal', value);
        }
    }
}