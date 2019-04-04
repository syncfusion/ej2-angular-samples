import { Component, OnInit } from '@angular/core';
import { orderDetails } from './data';
import { RowDDService, SelectionService } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'drag-drop-within-grid.html',
    providers: [RowDDService,
        SelectionService]
})
export class DragWithinSingle implements OnInit {
    public data: Object[] = [];
    public selectOptions: Object;

    ngOnInit(): void {
        this.data = orderDetails;
        this.selectOptions = { type: 'Multiple' };
    }
}