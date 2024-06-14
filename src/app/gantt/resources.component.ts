import { Component, OnInit} from '@angular/core';
import { resourceData, resourceResources } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-ganttresources',
    templateUrl: 'resources.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})

export class GanttResourcesComponent implements OnInit {
    public data: object[];
    public resources: object[];
    public taskSettings: object;
    public columns: object[];
    public labelSettings: object;
    public splitterSettings: object;
    public editSettings: object;
    public toolbar: string[];
    public resourceFields: object ;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public taskType: string;
    public ngOnInit(): void {
        this.data = resourceData;
        this.resources = resourceResources;
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            duration: 'Duration',
            progress: 'Progress',
            child: 'subtasks',
            work:'work',
            type: 'taskType',
            resourceInfo: 'resources'
        };
        this.taskType = "FixedWork";
        this.resourceFields = {
            id: 'resourceId',
            name: 'resourceName',
            unit: 'unit'
        };
        this.columns =  [
			{ field: 'TaskID', visible: false },
            { field: 'TaskName', headerText: 'Task Name', width: '180' },
            { field: 'resources', headerText: 'Resources', width: '160' },
            { field: 'work', width: '110' },
            { field: 'Duration', width: '100' },
            { field: 'taskType', headerText: 'Task Type', width: '110' }
        ];
        this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        };
        this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
        this.splitterSettings = {
            columnIndex: 5.1
        }
        this.labelSettings = {
            rightLabel: 'resources'
        };
        this.projectStartDate= new Date('03/28/2024');
        this.projectEndDate= new Date('07/28/2024');
    }
}
