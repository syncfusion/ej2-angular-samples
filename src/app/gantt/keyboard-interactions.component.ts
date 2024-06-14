import { Component, OnInit } from '@angular/core';
import { projectNewData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-ganttkeynavigations',
    templateUrl: 'keyboard-interactions.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})
export class GanttKeyboardInteractionsComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public labelSettings: object;
    public columns: object[];
    public splitterSettings: object;
    public editSettings: object;
    public toolbar: string[];
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
        this.columns = [
            { field: 'TaskID', width: 80 },
            { field: 'TaskName', width: 250 },
            { field: 'StartDate' },
            { field: 'EndDate' },
            { field: 'Duration' },
            { field: 'Predecessor' },
            { field: 'Progress' },
        ];
        this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
        };
        this.splitterSettings = {
            columnIndex: 2
        };
        this.toolbar = ['Search'];
        this.projectStartDate = new Date('03/24/2024');
        this.projectEndDate = new Date('07/06/2024');
        this.labelSettings = {
            leftLabel: 'TaskName',
        };
    }
}
