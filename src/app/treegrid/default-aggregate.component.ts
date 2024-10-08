import { Component, OnInit, ViewChild } from '@angular/core';
import { summaryRowData } from './jsontreegriddata';
import { AggregateService } from '@syncfusion/ej2-angular-treegrid';
import { FailureEventArgs } from '@syncfusion/ej2-grids';
import { CheckBox, CheckBoxModule, ChangeEventArgs } from '@syncfusion/ej2-angular-buttons';
import { TreeGridComponent, TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { NgClass } from '@angular/common';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'default-aggregate.html',
    providers:[AggregateService],
    standalone: true,
    imports: [TreeGridModule, SBActionDescriptionComponent, SBDescriptionComponent, CheckBoxModule, NgClass]
})
export class AggregateComponent implements OnInit {
    public data: Object[] = [];
    @ViewChild('treegrid')
    public treegrid : TreeGridComponent ;
    ngOnInit(): void {
        this.data = summaryRowData;


    }
    public actionFailure (e: FailureEventArgs): void {
   
    }
    public onChange ( args: ChangeEventArgs): void {
        if (args.checked) {
            this.treegrid.aggregates[0].showChildSummary = true;
            this.treegrid.refresh();
         } else {
            this.treegrid.aggregates[0].showChildSummary = false;
            this.treegrid.refresh();
        }
}
}