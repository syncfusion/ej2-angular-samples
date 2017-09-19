import { Component, OnInit } from '@angular/core';
import { ResizeService } from '@syncfusion/ej2-ng-grids';
import { data } from '../data';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'columnresizing.html',
    providers: [ResizeService]
})
export class ColumnResizingComponent implements OnInit {
    public data: Object[];
    ngOnInit(): void {
         this.data = data.slice(0, 60);
    }
}