import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { orderDetails } from './data';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

/**
 * Row height sample
 */

@Component({
    selector: 'ej2-gridrowheight',
    templateUrl: 'row-height.html',
    encapsulation: ViewEncapsulation.None
})
export class RowHeightComponent implements OnInit {
    public data: Object[];

    @ViewChild('grid')
    public grid: GridComponent;
    public toolbar: Object[];

    ngOnInit(): void {
        this.data = orderDetails;
        this.toolbar = [
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Right' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right' },
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Right' }
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