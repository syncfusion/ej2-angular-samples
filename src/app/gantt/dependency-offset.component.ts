import { Component, OnInit, ViewChild } from '@angular/core';
import { GanttComponent, GanttModule, EditService, SelectionService, DayMarkersService } from '@syncfusion/ej2-angular-gantt';
import { leadLagOffsetData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-dependency-offset',
    templateUrl: 'dependency-offset.html',
    standalone: true,
    imports: [ GanttModule, SBActionDescriptionComponent, SBDescriptionComponent ],
    providers: [ EditService, SelectionService, DayMarkersService ]
})
export class GanttDependencyOffsetComponent implements OnInit {
    @ViewChild('ganttObj')
    public ganttObj: GanttComponent;
    public data: object[];
    public taskSettings: object;
    public labelSettings: object;
    public splitterSettings: object;
    public editSettings: object;
    public columns: object[];
    public projectStartDate: Date;

    public ngOnInit(): void {
        this.data = leadLagOffsetData;
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            parentID: 'ParentID'
        };
        this.labelSettings = {
            leftLabel: 'TaskName'
        };
        this.splitterSettings = {
            columnIndex: 3
        };
        this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        };
        this.columns = [
            {
                field: 'TaskID',
                visible: false
            },
            {
                field: 'TaskName',
                headerText: 'Task Name',
                width: 200
            },
            {
                field: 'Predecessor',
                headerText: 'Dependency',
                width: 160
            },
            {
                field: 'StartDate',
                headerText: 'Start Date',
                width: 130
            },
            {
                field: 'Duration',
                headerText: 'Duration',
                width: 110
            },
            {
                field: 'Progress',
                headerText: 'Progress',
                width: 100
            }
        ];
        this.projectStartDate = new Date('01/01/2026');
    }

    public created(): void {
        if (document.querySelector('.e-bigger')) {
            this.ganttObj.rowHeight = 48;
            this.ganttObj.taskbarHeight = 28;
        }
    }
}