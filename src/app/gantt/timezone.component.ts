import { Component, OnInit, ViewChild} from '@angular/core';
import { GanttAllModule, GanttComponent } from '@syncfusion/ej2-angular-gantt';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-gantttimeline',
    templateUrl: 'timezone.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})
export class GanttTimezoneComponent implements OnInit {
    @ViewChild('gantt')
    public ganttObj: GanttComponent;
    public data: object[];
    public taskSettings: object;
    public columns: object[];
    public timelineSettings: object;
    public timezoneValue: string = 'UTC';
    public dayWorkingTime: object[];
    public ngOnInit(): void {
        this.data = [
            { taskID: 1, taskName: 'Project Schedule', startDate: new Date('02/04/2024 08:00'), endDate: new Date('03/10/2024')},
            { taskID: 2, taskName: 'Planning', startDate: new Date('02/04/2024 08:00'), endDate: new Date('02/10/2024'), parentID: 1},
            { taskID: 3, taskName: 'Plan timeline', startDate: new Date('02/04/2024 08:00'), endDate: new Date('02/10/2024'), duration: 6, progress: '60', parentID: 2 },
            { taskID: 4, taskName: 'Plan budget', startDate: new Date('02/04/2024 08:00'), endDate: new Date('02/10/2024'), duration: 6, progress: '90', parentID: 2 },
            { taskID: 5, taskName: 'Allocate resources', startDate: new Date('02/04/2024 08:00'), endDate: new Date('02/10/2024'), duration: 6, progress: '75', parentID: 2 },
            { taskID: 6, taskName: 'Planning complete', startDate: new Date('02/06/2024 08:00'), endDate: new Date('02/10/2024'), duration: 0,  predecessor: '3FS,4FS,5FS', parentID: 2 },
            { taskID: 7, taskName: 'Design', startDate: new Date('02/13/2024 08:00'), endDate: new Date('02/17/2024 08:00'), parentID: 1, },
            { taskID: 8, taskName: 'Software Specification', startDate: new Date('02/13/2024 08:00'), endDate: new Date('02/15/2024'), duration: 3, progress: '60', predecessor: '6FS', parentID: 7, },
            { taskID: 9, taskName: 'Develop prototype', startDate: new Date('02/13/2024 08:00'), endDate: new Date('02/15/2024'), duration: 3, progress: '100', predecessor: '6FS', parentID: 7, },
            { taskID: 10, taskName: 'Get approval from customer', startDate: new Date('02/16/2024 08:00'), endDate: new Date('02/17/2024 08:00'), duration: 2, progress: '100', predecessor: '9FS', parentID: 7 },
            { taskID: 11, taskName: 'Design complete', startDate: new Date('02/17/2024 08:00'), endDate: new Date('02/17/2024 08:00'), duration: 0, predecessor: '10FS', parentID: 7 }
        ];
        this.taskSettings = {
            id: 'taskID',
            name: 'taskName',
            startDate: 'startDate',
            duration: 'duration',
            progress: 'progress',
            dependency: 'predecessor',
            parentID: 'parentID'
        };
        this.columns = [
            { field: 'taskID', width: 120 },
            { field: 'taskName', width: 250 },
            { field: 'startDate' },
            { field: 'endDate' },
            { field: 'duration' },
            { field: 'predecessor' },
            { field: 'progress' },
        ];
        this.timelineSettings = {
            timelineUnitSize: 65,
            topTier: {
                unit: 'Day',
                format: 'MMM dd, yyyy'
            },
            bottomTier: {
                unit: 'Hour',
                format: 'hh:mm a'
            }
        };
        this.dayWorkingTime = [{ from: 0, to: 24 }];
    }
}


