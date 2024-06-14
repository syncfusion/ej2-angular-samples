import { Component, OnInit} from '@angular/core';
import { projectNewData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-ganttundoredo',
    templateUrl: 'undo-redo.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})
export class GanttUndoRedoComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public splitterSettings: object;
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public toolbar: any;
    public editSettings: any;
    public undoRedoActions: any;
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
        this.undoRedoActions = ['Sorting','Add','ColumnReorder','ColumnResize','ColumnState','Delete','Edit','Filtering','Indent','Outdent','NextTimeSpan','PreviousTimeSpan','RowDragAndDrop','Search'];
        this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'Search', 'Undo', 'Redo'];
        this.splitterSettings = {
            columnIndex: 3
        },
        this.projectStartDate = new Date('03/24/2024');
        this.projectEndDate = new Date('07/06/2024');
        this.labelSettings = {
            leftLabel: 'TaskName',
        };
    }
}
