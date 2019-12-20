import { Component, OnInit} from '@angular/core';
import { editingData, editingResources } from './data';
@Component({
    selector: 'ej2-ganttresources',
    templateUrl: 'resources.html'
})
export class GanttResourcesComponent implements OnInit {
    public data: object[];
    public resources: object[];
    public taskSettings: object;
    public columns: object[];
    public labelSettings: object;
    public splitterSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public ngOnInit(): void {
        this.data = editingData;
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks',
            notes: 'info',
            resourceInfo: 'resources'
        };
        this.columns =  [
            { field: 'TaskID', width:60 },
            { field: 'TaskName', headerText: 'Job Name', width: '150', clipMode: 'EllipsisWithTooltip' },
            { field: 'resources', width: '250', clipMode: 'EllipsisWithTooltip' },
            { field: 'StartDate' },
            { field: 'Duration' },
            { field: 'Progress' },
            { field: 'Predecessor' }
        ];
        this.splitterSettings = {
            columnIndex: 3
        }
        this.labelSettings = {
            leftLabel: 'TaskName',
            rightLabel: 'resources'
        };
        this.projectStartDate= new Date('03/25/2019');
        this.projectEndDate= new Date('07/28/2019');
        this.resources = editingResources;
    }
}
