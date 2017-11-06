import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-ng-grids';
import { data } from './data';

/**
 * Row height sample
 */

@Component({
    selector: 'ej2-gridrowheight',
    templateUrl: 'rowheight.html',
    encapsulation: ViewEncapsulation.None
})
export class RowHeightComponent implements OnInit {
    public data: Object[];
    public initialPage: Object;

    @ViewChild('grid')
    public grid: GridComponent;

    ngOnInit(): void {
        this.data = data.slice(0, 20);
        this.initialPage = { pageCount: 5, pageSize: 10 };
    }
}

interface OrderDetails {
    OrderID?: number;
 }