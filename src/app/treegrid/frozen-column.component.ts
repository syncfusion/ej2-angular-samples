import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { FreezeService, TreeGridComponent, SortService, SelectionService } from '@syncfusion/ej2-angular-treegrid';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'frozencolumn.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ FreezeService, SortService, SelectionService ]
})

export class FreezeComponent implements OnInit {
    public data: Object[] = [];
    public dateformat: Object;

    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;

    ngOnInit(): void {
        this.data = sampleData;
        this.dateformat = { type: 'dateTime', format: 'dd/MM/yyyy' };
    }
}