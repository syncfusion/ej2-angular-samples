import { Component, OnInit } from '@angular/core';
import { selfData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-ganttselfreference',
    templateUrl: 'self-reference-data.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
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
            parentID: 'parentID'
        };
        this.columns = [
            { field: 'taskID', width: 80 },
            { field: 'taskName', width: 250 },
            { field: 'startDate' },
            { field: 'endDate' },
            { field: 'duration' },
            { field: 'predecessor' },
            { field: 'progress' },
        ];
        this.projectStartDate = new Date('01/28/2024');
        this.projectEndDate = new Date('03/10/2024');
        this.labelSettings = {
            leftLabel: 'taskName',
        };
        this.splitterSettings = {
            columnIndex: 2
        };
    }
}
