import { Component, OnInit, ViewChild } from '@angular/core';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { DropDownListComponent, ChangeEventArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { GridComponent, PageService, SortService, FilterService, GridModule } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-gridloadinganimation',
    templateUrl: 'loading-animation.html',
    providers: [PageService, SortService, FilterService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, DropDownListModule, SBDescriptionComponent]
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