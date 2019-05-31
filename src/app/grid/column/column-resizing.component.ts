import { Component, OnInit } from '@angular/core';
import { ResizeService } from '@syncfusion/ej2-angular-grids';
import { orderDetails } from './data';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'column-resizing.html',
    providers: [ResizeService]
})
export class ColumnResizingComponent implements OnInit {
    public data: Object[];
    ngOnInit(): void {
         this.data = orderDetails;
    }
}