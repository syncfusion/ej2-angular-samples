import { Component, OnInit } from '@angular/core';
import { GanttComponent } from '@syncfusion/ej2-angular-gantt';
import { splitTasksData } from './data';
@Component({
    selector: 'ej2-ganttsplittasks',
    templateUrl: 'split-tasks.html'
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
            columnIndex: 2
        };
        this.labelSettings = {
            leftLabel: 'TaskName',
            taskLabel: '${Progress}%'
        };
        this.projectStartDate= new Date('01/30/2019');
        this.projectEndDate= new Date('03/04/2019');
    }
}