import { Component, ViewChild, OnInit } from '@angular/core';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { GridComponent, FilterService, FilterType, SortService  } from '@syncfusion/ej2-angular-grids';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { Query, DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const SERVICE_URI: string = 'https://services.syncfusion.com/angular/production/';
@Component({
    selector: 'ej-gridfiltermenu',
    templateUrl: 'filter-menu.html',
    styleUrls: ['filter.style.css'],
    providers: [FilterService, SortService]
})
export class FilteringMenuComponent implements OnInit {
    public data: DataManager;
    public query: Query;
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

    @ViewChild('checkbox')
    public checkBoxInstance: CheckBoxComponent;

    ngOnInit(): void {
        this.data = new DataManager({ url: SERVICE_URI + 'api/UrlDataSource', adaptor: new UrlAdaptor });
        this.query = new Query().addParams('dataCount', '10000');
        this.pageSettings = { pageCount: 5 };
        this.filterSettings = { type: 'Menu' };
        this.ddldata = this.filteringType;
    }
    public onChange(e: ChangeEventArgs): void {
        this.checkBoxInstance.checked = false;
        this.grid.filterSettings.enableInfiniteScrolling = false;
        this.grid.filterSettings.type = <FilterType>e.value;
        this.grid.clearFiltering();
        if (this.grid.filterSettings.type === 'Excel' || this.grid.filterSettings.type === 'CheckBox') {
            this.checkBoxInstance.disabled = false;
        } else {
            this.checkBoxInstance.disabled = true;
        }
    }
    public changeHandler(e: any): void {
        this.grid.filterSettings.enableInfiniteScrolling = e.checked;
    }
}
