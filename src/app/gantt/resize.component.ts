import { Component, OnInit} from '@angular/core';
import { editingData } from './data';

@Component({
    selector: 'ej2-ganttresize',
    templateUrl: 'resize.html'
})

export class ResizeComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public columns: object[];
    public labelSettings: object;
    public projectStartDate: Date;
    public splitterSettings: object;
    public projectEndDate: Date;
    public ngOnInit(): void {
        this.data = editingData;
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
            { field: 'TaskID', headerText: 'ID', width: 80, minWidth: 8 },
            { field: 'TaskName', headerText: 'Job Name', width: 250, minWidth: 120, maxWidth: 300 },
            { field: 'StartDate', width: 135, minWidth: 8 },
            { field: 'EndDate', width: 135, minWidth: 8 },
            { field: 'Duration', allowResizing: false, width: 120 },
            { field: 'Progress', headerText: 'Progress', textAlign: 'Right', width: 120 , minWidth: 8},
            { field: 'Predecessor', headerText: 'Dependency', textAlign: 'Left', width: 135, minWidth: 8 }
        ];
        this.splitterSettings = {
            columnIndex: 6
        },
        this.labelSettings = {
            rightLabel: 'TaskName'
        };
        this.projectStartDate= new Date('03/25/2019');
        this.projectEndDate= new Date('07/28/2019');
    }
}
