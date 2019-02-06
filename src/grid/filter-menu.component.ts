import { Component, ViewChild, OnInit } from '@angular/core';
import { orderDataSource } from './data';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { GridComponent, FilterService, FilterType } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'ej-gridfiltermenu',
    templateUrl: 'filter-menu.html',
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
    public formatoptions: Object;

    @ViewChild('grid')
    public grid: GridComponent;

    ngOnInit(): void {
        this.data = orderDataSource;
        this.pageSettings = { pageCount: 5 };
        this.filterSettings = { type: 'Menu' };
        this.ddldata = this.filteringType;
        this.formatoptions = { type: 'dateTime', format: 'M/d/y hh:mm a' }
    }
    public onChange(e: ChangeEventArgs): void {
        this.grid.filterSettings.type = <FilterType>e.value;
        this.grid.clearFiltering();
    }
}