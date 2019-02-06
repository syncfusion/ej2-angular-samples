import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { ReorderService } from '@syncfusion/ej2-angular-treegrid';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'column.reorder.html',
    providers: [ReorderService]
})
export class ColumnReorderComponent implements OnInit {
    public data: Object[] = [];
    public pageSettings: Object;
    ngOnInit(): void {
        this.data = sampleData;
        this.pageSettings = { pageSize: 8 }
    }
}