import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '@syncfusion/ej2-ng-grids';
import { data } from '../data';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'columnchooser.html',
    providers: [ToolbarService]
})
export class ColumnChooserComponent implements OnInit {
    public data: Object[];
    public toolbar: string[];
    ngOnInit(): void {
         this.data = data;
         this.toolbar = ['columnchooser'];
    }
}