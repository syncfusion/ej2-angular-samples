import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { FreezeService, TreeGridComponent, SortService, SelectionService, TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'frozen-column.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ FreezeService, SortService, SelectionService ],
    standalone: true,
    imports: [TreeGridModule, SBActionDescriptionComponent, SBDescriptionComponent]
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