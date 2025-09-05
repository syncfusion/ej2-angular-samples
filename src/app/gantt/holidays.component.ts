import { Component, OnInit} from '@angular/core';
import { projectNewData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-ganttholiday',
    templateUrl: 'holidays.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})
export class GanttHolidaysComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public columns: object[];
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
            parentID:'ParentId'
        };
        this.columns = [
            { field: 'TaskID',visible: false, width: 80 },
            { field: 'TaskName', width: 250 },
            { field: 'StartDate' },
            { field: 'EndDate' },
            { field: 'Duration' },
            { field: 'Predecessor' },
            { field: 'Progress' },
        ];
        this.projectStartDate = new Date('03/25/2025');
        this.projectEndDate = new Date('07/20/2025');
        this.labelSettings = {
            leftLabel: 'TaskName',
        };
        this.holidays = [
           {
                    from: new Date('03/28/2025'),
                    to: new Date('03/28/2025'),
                    label: 'Good Friday'
                },{
                    from: new Date('03/30/2025'),
                    to: new Date('03/30/2025'),
                    label: 'Easter Sunday'
                }, {
                    from: new Date('05/26/2025'),
                    to: new Date('05/26/2025'),
                    label: 'Memorial Day'
                }, {
                    from: new Date('07/04/2025'),
                    to: new Date('07/04/2025'),
                    label: 'Independence Day'
                }, 
        ];
    }
}
