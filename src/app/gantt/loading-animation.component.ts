import { Component, OnInit, ViewChild } from '@angular/core';
import { virtualData } from './data';
import { GanttComponent, FilterService, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { DropDownListComponent, ChangeEventArgs, DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-ganttfiltering',
    templateUrl: 'loading-animation.html',
    providers: [FilterService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, DropDownListAllModule, SBDescriptionComponent]
})
export class GanttLoadingAnimationComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public loadingIndicator:object;
    public splitterSettings: object;
    public columns: object[];
    public labelSettings: object;
    @ViewChild('gantt')
    public gantt: GanttComponent;
    @ViewChild('dropdown1')
    public dropdown1: DropDownListComponent;
    public d1data: Object;
    public typefields: Object;
    public ngOnInit(): void {
        this.data = virtualData;
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            parentID: 'parentID'
        };
        this.loadingIndicator = {indicatorType: 'Shimmer'}
        this.typefields = { text: 'mode' , value: 'id'};
        this.d1data= [ { id: 'Shimmer', mode: 'Shimmer' },
                       { id: 'Spinner', mode: 'Spinner' }
        ];
        this.columns = [
            { field: 'TaskID' },
            { field: 'TaskName' },
            { field: 'StartDate' },
            { field: 'Duration' },
            { field: 'Progress' }
        ];
        this.splitterSettings = {
            columnIndex: 3
        };
        this.labelSettings = {
            rightLabel: 'TaskName',
        };
    }
    
    change (e: ChangeEventArgs) : void {
        let type: any = <string>e.value;
        if (type === "Shimmer") {
            this.gantt.loadingIndicator.indicatorType = "Shimmer";
            this.gantt.enableVirtualMaskRow = true;
            this.gantt.refresh();
        } else {
            this.gantt.loadingIndicator.indicatorType = "Spinner";
            this.gantt.enableVirtualMaskRow = false;
            this.gantt.refresh();
        }
    }
}
