import { Component, OnInit} from '@angular/core';
import { taskModeData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { DayMarkersService, EditService, GanttModule, SelectionService, ToolbarService } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-gantttaskmode',
    templateUrl: 'taskMode.html',
    standalone: true,
    providers: [SelectionService, DayMarkersService, EditService, ToolbarService],
    imports: [SBActionDescriptionComponent, GanttModule, SBDescriptionComponent]
})

export class GanttTaskModeComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public columns: object[];
    public labelSettings: object;
    public splitterSettings: object;
    public editSettings: object;
    public toolbar: string[];
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
        this.columns = [
            { field: 'TaskID', visible: false },
            { field: 'TaskName', headerText: 'Task Name', width: 130},
            { field: 'isManual', headerText: 'Task Mode', width: 120 }
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
        };
        this.labelSettings = {
            leftLabel: 'TaskName'
        };
        this.projectStartDate = new Date('02/20/2025');
        this.projectEndDate = new Date('03/30/2025');
    }
}
