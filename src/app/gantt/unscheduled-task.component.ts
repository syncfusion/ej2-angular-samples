import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { unscheduledData } from './data';
import { GanttComponent } from '@syncfusion/ej2-angular-gantt';

@Component({
    selector: 'control-content',
    templateUrl: 'unscheduled-task.html',
    styleUrls: ['unscheduled.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class GanttUnscheduledComponent implements OnInit {
    @ViewChild('unscheduleGantt')
    public ganttObj: GanttComponent;
    public data: object[];
    public taskSettings: object;
    public editSettings: object;
    public splitterSettings: object;
    public toolbar: object[];
    public columns: object[];
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public ngOnInit(): void {
        this.data = unscheduledData;
        this.taskSettings = {
            id: 'TaskId',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
        };
        this.editSettings = {
            allowAdding: true,
            allowEditing: true
        };
        this.toolbar = [{ text: 'Insert task', tooltipText: 'Insert task at top', id: 'toolbarAdd', prefixIcon: 'e-add-icon tb-icons' }],
        this.labelSettings = {
            leftLabel: 'TaskName',
            rightLabel: 'TaskType'
        };
        this.columns = [
            {field: 'TaskId', width: 60 },
            {field: 'TaskName', width: 80 },
            {field: 'StartDate', width: 120},
            {field: 'EndDate', width: 120 },
            {field: 'Duration', width: 90 },
            {field: 'TaskType', visible: false}
        ];
        this.splitterSettings = {
            columnIndex: 4
        };
        this.projectStartDate = new Date('01/01/2019');
        this.projectEndDate = new Date('01/20/2019');
    }
    public toolbarClickAction(args: object): void {
        var data = {
            Duration: null,
            StartDate: null,
            EndDate: null,
            TaskType: ''
        };
        this.ganttObj.addRecord(data)
    }
 
}
