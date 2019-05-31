import { Component, OnInit} from '@angular/core';
import { baselineData } from './data';
import { Internationalization } from '@syncfusion/ej2-base';
let instance: Internationalization = new Internationalization();
@Component({
    templateUrl: 'baseline.html'
})
export class GanttBaselineComponent implements OnInit {
    public data: Object[];
    public taskSettings: object;
    public columns: object[];
    public timelineSettings: object;
    public labelSettings: object;
    public tooltipSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public dayWorkingTime: object[];
    public ngOnInit(): void {
        this.data = baselineData;
        this.taskSettings = {
            id: 'TaskId',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            progress: 'Progress',
            baselineStartDate: 'BaselineStartDate',
            baselineEndDate: 'BaselineEndDate',
            child: 'subtasks'
        };
        this.columns =  [
            { field: 'TaskName', headerText: 'Service Name', width: '250' },
            { field: 'BaselineStartDate', headerText: 'Planned start time' },
            { field: 'BaselineEndDate', headerText: 'Planned end time' },
            { field: 'StartDate', headerText: 'Start time' },
            { field: 'EndDate', headerText: 'End time' },
          ];
        this.dayWorkingTime = [{ from: 0, to: 24 }];
        this.timelineSettings = {
            timelineUnitSize: 70,
            topTier: {
                unit: 'None',
            },
            bottomTier: {
                unit: 'Minutes',
                count: 15,
                format: 'hh:mm a'
            },
        };
        this.projectStartDate= new Date('03/05/2018 09:30:00 AM');
        this.projectEndDate= new Date('03/05/2018 7:00:00 PM');
    }
    public format(value: Date): string {
        return instance.formatDate(value, { format: 'hh:mm a' });
    }
}
export interface DateFormat extends Window {
    format?: Function;
}