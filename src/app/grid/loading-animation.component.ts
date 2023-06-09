import { Component, OnInit, ViewChild } from '@angular/core';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { GridComponent, PageService, SortService, FilterService } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'ej2-gridloadinganimation',
    templateUrl: 'loading-animation.html',
    providers: [PageService, SortService, FilterService ]
})
export class LoadingAnimationComponent implements OnInit {
    public data: DataManager;
    public pageSettings: Object;
    public loadingIndicator;

    @ViewChild('grid')
    public grid: GridComponent;
    @ViewChild('dropdown')
    public dropdown: DropDownListComponent;

    public fields: object = { text: 'name', value: 'id' };
    public indicatortypes: Object[] = [
        { id: 'Shimmer', name: 'Shimmer' },
        { id: 'Spinner', name: 'Spinner' }
    ];

    ngOnInit(): void {
        this.data = new DataManager({ url: 'https://services.syncfusion.com/angular/production/api/UrlDataSource', adaptor: new UrlAdaptor });
        this.pageSettings = { pageCount: 3 };
        this.loadingIndicator = {indicatorType: 'Shimmer'};
    }

    public indicatorChange(e: ChangeEventArgs): void {
        if (this.dropdown.value === 'Shimmer') {
            this.grid.loadingIndicator.indicatorType = 'Shimmer';
            this.grid.refresh();
        } else {
            this.grid.loadingIndicator.indicatorType = 'Spinner';
            this.grid.refresh();
        }
    }
}