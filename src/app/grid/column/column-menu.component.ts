import { Component, OnInit } from '@angular/core';
import { SortService, ResizeService, GroupService, ColumnMenuService, PageService, FilterService, GridModule } from '@syncfusion/ej2-angular-grids';
import { ContextMenuItem, GroupSettingsModel, FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { orderDetails } from './data';
import { SBDescriptionComponent } from '../../common/dp.component';
import { SBActionDescriptionComponent } from '../../common/adp.component';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'column-menu.html',
    providers: [SortService, ResizeService, GroupService, ColumnMenuService, PageService, FilterService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class ColumnMenuComponent implements OnInit {
    public data: Object[];
    public groupOptions: GroupSettingsModel;
    public filterSettings: FilterSettingsModel;
    ngOnInit(): void {
        this.data = orderDetails;
        this.groupOptions = { showGroupedColumn: true };
        this.filterSettings = { type: 'CheckBox' };
    }
}