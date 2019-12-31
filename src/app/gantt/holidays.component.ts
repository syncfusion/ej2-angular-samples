import { Component, OnInit} from '@angular/core';
import { projectNewData } from './data';
@Component({
    selector: 'ej2-ganttholiday',
    templateUrl: 'holidays.html'
})
export class GanttHolidaysComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public holidays: object[];
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
        this.holidays = [
            {
                from: new Date('04/04/2019'),
                to: new Date('04/04/2019'),
                label: 'Local Holiday'
            }, {
                from: new Date('04/19/2019'),
                to: new Date('04/19/2019'),
                label: 'Good Friday'
            }, {
                from: new Date('04/30/2019'),
                to: new Date('04/30/2019'),
                label: 'Release Holiday'
            }, 
        ];
    }
}
