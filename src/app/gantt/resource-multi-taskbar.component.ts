import { Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { multiTaskbarData, resources } from './data';
import { GanttComponent, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBDescriptionComponent } from '../common/dp.component';
import { SwitchAllModule } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-ganttresources',
    templateUrl: 'resource-multi-taskbar.html',
    styleUrls: ['reasource-multi-taskbar.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SwitchAllModule, GanttAllModule, SBDescriptionComponent]
})

export class GanttResourceMultiTaskbarComponent implements OnInit {
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
    @ViewChild('gantt')
    public ganttObj: GanttComponent;
    public ngOnInit(): void {
        this.data = multiTaskbarData;
        this.resources = resources;
        this.taskType = 'FixedWork';
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            dependency: 'Predecessor',
            progress: 'Progress',
            resourceInfo: 'resources',
            work:'work',
            expandState: 'isExpand',
            child: 'subtasks'
        };
        this.resourceFields = {
            id: 'resourceId',
            name: 'resourceName',
            unit: 'unit',
            group: 'resourceGroup'
        };
        this.columns =  [
			{ field: 'TaskID', visible: false },
            { field: 'TaskName', headerText: 'Task Name', width: '250' },
            { field: 'work', headerText: 'Work' },
            { field: 'Progress'},
            { field: 'resourceGroup', headerText: 'Group' },
            { field: 'StartDate'},
            { field: 'Duration' }
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
            columnIndex: 2
        }
        this.labelSettings = {
            taskLabel: 'TaskName'
        };
        this.projectStartDate= new Date('03/24/2024');
        this.projectEndDate= new Date('07/28/2024');
    }
    public dragDropChange(args): any {
        if (args.checked) {
            this.ganttObj.allowTaskbarDragAndDrop = true;
        } else {
            this.ganttObj.allowTaskbarDragAndDrop = false;
        }
    }
    public overlapChange(args): any {
        if (args.checked) {
            this.ganttObj.allowTaskbarOverlap = true;
        } else {
            this.ganttObj.allowTaskbarOverlap = false;
        }
    }
}
