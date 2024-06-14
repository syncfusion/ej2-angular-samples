import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GridComponent, SortService, FilterService, ToolbarService, EditService, GridModule } from '@syncfusion/ej2-angular-grids';
import { orderDetails } from './data';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Row height sample
 */

@Component({
    selector: 'ej2-gridrowheight',
    templateUrl: 'row-height.html',
    providers: [SortService, FilterService, ToolbarService, EditService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class RowHeightComponent implements OnInit {
    public data: Object[];
    @ViewChild('grid')
    public grid: GridComponent;
    public filterSettings: Object;
    public toolbar: any;
    public editSettings: Object;
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;

    ngOnInit(): void {
        this.data = orderDetails;
        this.filterSettings = { type: 'Excel' };
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true, minLength: 5 };
        this.freightrules = { required: true, min: 0 };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Right', tooltipText: 'Row-height-big' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right', tooltipText: 'Row-height-medium' },
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Right', tooltipText: 'Row-height-small' }
            ];
}

    clickHandler(args: ClickEventArgs): void {
    if (args.item.id === 'small') {
        this.grid.rowHeight = 20;
        }
    if (args.item.id === 'medium') {
        this.grid.rowHeight = 40;
    }
    if (args.item.id === 'big') {
        this.grid.rowHeight = 60;
    }
}
}