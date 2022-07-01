import { Component, OnInit} from '@angular/core';
import { projectNewData } from './data';
@Component({
    selector: 'ej2-ganttcritical',
    templateUrl: 'critical-path.html'
})
export class GanttCriticalPathComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public columns: object[];
    public labelSettings: object;
    public toolbar: string[];
    public editSettings: object;
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
        this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        };
        this.toolbar = ['Add','Edit','Delete','CriticalPath'];
        this.columns =  [
            { field: 'TaskID', width:80 },
            { field: 'TaskName', headerText: 'Job Name', width: '250', clipMode: 'EllipsisWithTooltip' },
            { field: 'StartDate' },
            { field: 'Duration' },
            { field: 'Progress' },
            { field: 'Predecessor' }
        ];
        this.projectStartDate = new Date('03/24/2019');
        this.projectEndDate = new Date('07/06/2019');
        this.labelSettings = {
            leftLabel: 'TaskName',
        };
    }
}
