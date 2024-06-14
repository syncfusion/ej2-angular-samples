import { Component, OnInit } from '@angular/core';
import { editingData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-ganttsorting',
    templateUrl: 'sorting.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})
export class GanttSortingComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public columns: object[];
    public splitterSettings: object;
    public sortSettings: object;
    public ngOnInit(): void {
        this.data = editingData;
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
        this.columns = [
            { field: 'TaskID' },
            { field: 'TaskName', width: 250 },
            { field: 'StartDate' },
            { field: 'EndDate' },
            { field: 'Duration' },
            { field: 'Progress' },
        ];
        this.labelSettings = {
            leftLabel: 'TaskName',
        };
        this.splitterSettings = {
            columnIndex: 2
        };
        this.sortSettings = { columns: [{ field: 'TaskName', direction: 'Ascending' }, { field: 'TaskID', direction: 'Ascending' }] };
        this.projectStartDate = new Date('03/25/2024');
        this.projectEndDate = new Date('07/28/2024');
    }
}
