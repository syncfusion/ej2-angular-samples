import { Component, ViewChild, OnInit } from '@angular/core';
import { orderDetails } from './data';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { GridComponent, FilterService, FilterType } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'ej-gridfiltermenu',
    templateUrl: 'filtermenu.html',
    styleUrls: ['filter.style.css'],
    providers: [FilterService]
})
export class FilteringMenuComponent implements OnInit {
    public data: Object[];
    public ddldata: Object[];
    public pageSettings: Object;
    public filterSettings: Object;
    public filteringType: Object[] = [
        { Id: 'Menu', type: 'Menu' },
        { Id: 'CheckBox', type: 'Checkbox' },
        { Id: 'Excel', type: 'Excel' }
    ];
    public ddlfields: Object = { text: 'type', value: 'Id' };

    @ViewChild('grid')
    public grid: GridComponent;

    ngOnInit(): void {
        this.data = orderDetails;
        this.pageSettings = { pageCount: 5 };
        this.filterSettings = { type: 'Menu' };
        this.ddldata = this.filteringType;
    }
    public onChange(e: ChangeEventArgs): void {
        this.grid.filterSettings.type = <FilterType>e.value;
        this.grid.clearFiltering();
    }
}