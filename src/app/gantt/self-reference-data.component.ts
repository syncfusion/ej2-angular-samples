import { Component, OnInit } from '@angular/core';
import { selfData } from './data';
@Component({
    selector: 'ej2-ganttselfreference',
    templateUrl: 'self-reference-data.html'
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
            { field: 'taskID', width: 60 },
            { field: 'taskName', width: 250 },
            { field: 'startDate' },
            { field: 'endDate' },
            { field: 'duration' },
            { field: 'predecessor' },
            { field: 'progress' },
        ];
        this.projectStartDate = new Date('01/28/2019');
        this.projectEndDate = new Date('03/10/2019');
        this.labelSettings = {
            leftLabel: 'taskName',
        };
        this.splitterSettings = {
            columnIndex: 2
        };
    }
}
