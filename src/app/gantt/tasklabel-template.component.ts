import { Component, OnInit} from '@angular/core';
import { labelData, editingResources } from './data';
@Component({
    selector: 'ej2-gantttasklabeltemplate',
    templateUrl: 'tasklabel-template.html'
})
export class GanttTasklabelTemplateComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public columns: object[];
    public splitterSettings: object;
    public resources: object[];
    public resourceFields: object ;
    public ngOnInit(): void {
        this.data = labelData;
        this.resources = editingResources;
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            resourceInfo: 'resources',
            child: 'subtasks'
        };
        this.resourceFields = {
            id: 'resourceId',
            name: 'resourceName'
        };
        this.columns = [
            { field: 'TaskID', width: 60 },
            { field: 'TaskName', width: 250 },
            { field: 'StartDate' },
            { field: 'EndDate' },
            { field: 'Duration' },
            { field: 'Predecessor' },
            { field: 'Progress' },
            { field: 'resources' },
        ];
        this.splitterSettings = {
            columnIndex: 2
        };
        this.projectStartDate = new Date('03/24/2019');
        this.projectEndDate = new Date('05/04/2019');
        this.labelSettings = {
            taskLabel: '${Progress}%'
        };
    }
}