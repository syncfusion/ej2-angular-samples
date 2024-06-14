import { Component, OnInit } from '@angular/core';
import { GanttComponent, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { splitTasksData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-ganttsplittasks',
    templateUrl: 'split-tasks.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})

export class GanttSplitTasksComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public splitterSettings: object;
    public columns: object[];
    public editSettings: object;
    public toolbar: any;
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public ngOnInit(): void {
        this.data = splitTasksData;
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks',
            segments: 'Segments'
        };
        this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        };
		this.columns = [
                { field: 'TaskID', width: 80 },
                { field: 'TaskName', headerText: 'Job Name', width: '250', clipMode: 'EllipsisWithTooltip' },
                { field: 'StartDate' },
                { field: 'EndDate' },
                { field: 'Duration' },
                { field: 'Progress' },
                { field: 'Predecessor' }
            ];
        this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
        this.splitterSettings = {
            position: "35%"
        };
        this.labelSettings = {
            leftLabel: 'TaskName',
            taskLabel: '${Progress}%'
        };
        this.projectStartDate= new Date('01/30/2024');
        this.projectEndDate= new Date('03/04/2024');
    }
}
