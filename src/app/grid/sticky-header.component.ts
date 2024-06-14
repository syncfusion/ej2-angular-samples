import { Component, OnInit } from '@angular/core';
import { orderDetails } from './data';
import { SortService, GridModule, FilterService, ToolbarService, EditService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej-gridscroll',
    templateUrl: 'sticky-header.html',
    providers: [SortService, FilterService, ToolbarService, EditService],
    standalone: true,
    imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class StickyHeaderComponent implements OnInit {
    public data: Object[];
    public filterSettings: Object;
    public toolbar: string[];
    public editSettings: Object;
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    public ngOnInit(): void {
        this.data = orderDetails.slice(0, 50);
        this.filterSettings = { type: 'Excel' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true, minLength: 5 };
        this.freightrules = { required: true, min: 0 };
     }
}
