import { Component, OnInit} from '@angular/core';
import { customizedData } from './data';

@Component({
    templateUrl: 'taskbar-template.html',
    styleUrls: ['taskbar-template.component.css']
})
export class GanttTaskbarTemplateComponent implements OnInit {
    public data: object[];
    public dateFormat: string;
    public taskSettings: object;
    public columns: object[];
    public splitterSettings: Object;
    public dayWorkingTime: object;
    public durationUnit: string;
    public timelineSettings: object;
    public taskbarTemplate: string;
    public milestoneTemplate: string; 
    public tooltipSettings: object;
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public eventMarkers: object[];
    public ngOnInit(): void {
        this.data = customizedData;
        this.taskSettings = {
            id: 'TaskId',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            dependency: 'Predecessor',
         };
        this.columns = [
            { field: 'TaskId', headerText: 'Event Id' },
            { field: 'TaskName', headerText: 'Event Name', width: '250', clipMode: 'EllipsisWithTooltip' },
            { field: 'StartDate', headerText: 'Start Time' },
            { field: 'EndDate', headerText: 'End Time' },
            { field: 'Winner', headerText: 'Winner' },
            { field: 'Movie', headerText: 'Movie' },
            { field: 'Performance', headerText: 'Moments / Performance Details' }
        ];
        this.splitterSettings = {
            columnIndex: 1
        };
        this.dayWorkingTime = [{ from: 0, to: 24 }];
        this.durationUnit = 'Minute';
        this.timelineSettings = {
            timelineUnitSize: 60,
            topTier: {
                unit: 'Hour',
                format: 'MMM dd, yyyy'
            },
            bottomTier: {
                unit: 'Minutes',
                count: 2,
                format: 'h:mm a'
            },
        };
        this.eventMarkers = [
            {
                day: new Date('03/05/2018 07:09:00 PM'),
                label: 'Performance'
            }, {
                day: new Date('03/05/2018 07:46:00 PM'),
                label: 'Moments'
            }, {
                day: new Date('03/05/2018 07:59:00 PM'),
                label: 'Performance'
            }, {
                day: new Date('03/05/2018 08:08:00 PM'),
                label: 'Moments'
            }, {
                day: new Date('03/05/2018 08:24:00 PM'),
                label: 'Moments'
            }, {
                day: new Date('03/05/2018 08:31:00 PM'),
                label: 'Performance'
            }, {
                day: new Date('03/05/2018 08:47:00 PM'),
                label: 'Moments'
            }
        ];
        this.labelSettings = {
            leftLabel: 'TaskName',
        };
        this.projectStartDate = new Date('03/05/2018 06:00 PM'),
        this.projectEndDate = new Date('03/05/2018 09:50 PM')
    }
}
