import { Component, OnInit } from '@angular/core';
import { selfData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { DayMarkersService, GanttModule, SelectionService } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-ganttselfreference',
    templateUrl: 'self-reference-data.html',
    standalone: true,
    providers: [SelectionService, DayMarkersService],
    imports: [SBActionDescriptionComponent, GanttModule, SBDescriptionComponent]
})
export class GanttSelfDataComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public labelSettings: object;
    public columns: object[];
    public splitterSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public ngOnInit(): void {
        this.data = selfData;
        this.taskSettings = {
            id: 'taskID',
            name: 'taskName',
            startDate: 'startDate',
            endDate: 'endDate',
            duration: 'duration',
            progress: 'progress',
            dependency: 'predecessor',
            parentID: 'ParentID'
        };
        this.columns = [
            { field: 'taskID', width: 80 },
            { field: 'taskName', width: 250 },
            { field: 'startDate', width: 120 },
            { field: 'endDate', width: 120 },
            { field: 'duration', width: 120 },
            { field: 'predecessor', width: 120 },
            { field: 'progress', width: 120 }
        ];
        this.projectStartDate = new Date('01/28/2025');
        this.projectEndDate = new Date('03/30/2025');
        this.labelSettings = {
            leftLabel: 'taskName',
        };
        this.splitterSettings = {
            columnIndex: 2
        };
    }
}
