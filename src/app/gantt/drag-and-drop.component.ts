import { Component, OnInit} from '@angular/core';
import { projectNewData } from './data';
@Component({
    selector: 'ej2-ganttdraganddrop',
    templateUrl: 'drag-and-drop.html'
})
export class GanttDragAndDropComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public columns: object[];
    public labelSettings: object;
    public selectionSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public splitterSettings: object;
    public editSettings: any;
    public ngOnInit(): void {
        this.data = projectNewData;
        this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        };
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
        this.columns =  [
            { field: 'TaskID', headerText: 'ID', width: 80 },
            { field: 'TaskName', headerText: 'Name', width: 250 },
            { field: 'StartDate' },
            { field: 'EndDate' },
            { field: 'Duration' },
            { field: 'Progress' },
            { field: 'Predecessor', headerText: 'Dependency' }
        ];
        this.selectionSettings = {
            type: 'Multiple'
        };
        this.labelSettings = {
            leftLabel: 'TaskName'
        };
        this.projectStartDate= new Date('03/25/2019');
        this.projectEndDate= new Date('07/06/2019');
        this.splitterSettings = {
            columnIndex: 3
        };
    }
}