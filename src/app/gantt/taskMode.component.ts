import { Component, OnInit} from '@angular/core';
import { taskModeData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-ganttresources',
    templateUrl: 'taskMode.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})

export class GanttTaskModeComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public columns: object[];
    public labelSettings: object;
    public splitterSettings: object;
    public editSettings: object;
    public toolbar: string[];
    public resourceFields: object ;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public ngOnInit(): void {
        this.data = taskModeData;
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            duration: 'Duration',
            progress: 'Progress',
            endDate: 'EndDate',
            dependency:'Predecessor',
            child: 'Children',
            manual: 'isManual'
        };
        this.columns =  [
			{ field: 'TaskID', visible: false },
            { field: 'TaskName', headerText: 'Task Name' },
            { field: 'isManual', headerText: 'Task Mode' }
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
            position: "35%"
        }
        this.labelSettings = {
            leftLabel: 'TaskName'
        };
        this.projectStartDate= new Date('02/20/2024');
        this.projectEndDate= new Date('03/30/2024');
    }
}
