import { Component, OnInit} from '@angular/core';
import { projectNewData } from './data';
@Component({
    templateUrl: 'default.html'
})
export class GanttDefaultComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public eventMarkers: object[];
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
        this.eventMarkers = [
            {
                day: new Date("04/09/2019"),
                label: 'Research phase'
            }, {
                day: new Date("04/30/2019"),
                label: 'Design phase'
            }, {
                day: new Date("05/23/2019"),
                label: 'Production phase'
            }, {
                day: new Date("06/20/2019"),
                label: 'Sales and marketing phase'
            }
        ];
    }
}
