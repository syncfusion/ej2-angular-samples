import { Component, OnInit} from '@angular/core';
import { projectNewData } from './data';
@Component({
    selector: 'ej2-ganttdefault',
    templateUrl: 'default.html'
})
export class GanttDefaultComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public ngOnInit(): void {
        this.data = projectNewData;
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks'
        };
        this.projectStartDate = new Date('03/24/2019');
        this.projectEndDate = new Date('07/06/2019');
        this.labelSettings = {
            leftLabel: 'TaskName',
        };
    }
}
