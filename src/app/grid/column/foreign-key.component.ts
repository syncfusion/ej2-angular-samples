import { Component, OnInit, ViewChild } from '@angular/core';
import { orderDetails, customerData } from './data';
import { FilterService, GridComponent, EditService, SortService, ToolbarService, PageService, ToolbarItems, EditSettingsModel, ForeignKeyService, GridModule } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../../common/dp.component';
import { SBActionDescriptionComponent } from '../../common/adp.component';

@Component({
    selector: 'ej2-foreigngrid',
    templateUrl: 'foreign-key.html',
    providers: [FilterService, EditService, SortService, ToolbarService, ForeignKeyService, PageService],
    standalone: true,
    imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ForeignKeyColumnComponent implements OnInit {
    public data: Object[];
    public pageSettings: Object;
    public filterSettings: Object;
    public toolbarItems: ToolbarItems[];
    public editOptions: EditSettingsModel;
    public customerData: Object[];
    public orderidrules: Object;

    @ViewChild('grid')
    public grid: GridComponent;

    public ngOnInit(): void {
        this.data = orderDetails;
        this.pageSettings = { pageCount: 5 };
        this.filterSettings = { type: 'Menu' };
        this.toolbarItems = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        this.customerData = customerData;
        this.editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
        this.orderidrules = { required: true };
    }

}