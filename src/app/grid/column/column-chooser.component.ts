import { Component, OnInit } from '@angular/core';
import { ToolbarService, ColumnChooserService } from '@syncfusion/ej2-angular-grids';
import { data } from './data';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'column-chooser.html',
    providers: [ToolbarService, ColumnChooserService]
})
export class ColumnChooserComponent implements OnInit {
    public data: Object[];
    public toolbar: string[];
    public pageSettings: Object;
    ngOnInit(): void {
         this.data = data;
         this.toolbar = ['ColumnChooser'];
         this.pageSettings ={ pageCount: 5 };
    }
}