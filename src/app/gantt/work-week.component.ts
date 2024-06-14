import { Component, OnInit, ViewChild} from '@angular/core';
import { projectNewData } from './data';
import { extend } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { GanttComponent, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { EJ2Instance } from '@syncfusion/ej2-schedule';
import { SelectEventArgs, RemoveEventArgs  } from '@syncfusion/ej2-dropdowns';
import { MultiSelectAllModule, MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-ganttworkweek',
    templateUrl: 'work-week.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, MultiSelectAllModule, SBDescriptionComponent]
})
export class GanttWorkWeekComponent implements OnInit {

    public data: object[];
    public workWeek: string[];
    public taskSettings: object;
    public splitterSettings: object;
    public columns: object[];
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public dropDownData: Object;
    public dropDownFields: Object;
    public mode: string;

    @ViewChild('ganttObj')
    public ganttObj: GanttComponent;

    @ViewChild('WorkingDaysObj')
    public WorkingDaysObj: MultiSelectComponent;

    public ngOnInit(): void {
        this.data = projectNewData;
        this.mode = 'CheckBox';
        this.dropDownFields = { text: 'day', value: 'id'};
        this.dropDownData= [   { id: 'Sunday', day: 'Sunday' },
        { id: 'Monday', day: 'Monday' },
        { id: 'Tuesday', day: 'Tuesday' },
        { id: 'Wednesday', day: 'Wednesday' },
        { id: 'Thursday', day: 'Thursday' },
        { id: 'Friday', day: 'Friday' },
        { id: 'Saturday', day: 'Saturday' }];
        this.workWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
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
            { field: 'TaskName', headerText: 'Name', width: 150 },
            { field: 'StartDate' },
            { field: 'EndDate' },
            { field: 'Duration' },
            { field: 'Progress' },
            { field: 'Predecessor', headerText: 'Dependency' }
        ];
        this.splitterSettings = {
            columnIndex: 1
        },
        this.projectStartDate = new Date('03/24/2024');
        this.projectEndDate = new Date('07/06/2024');
        this.labelSettings = {
            leftLabel: 'TaskName',
        };
    }
    select (args: SelectEventArgs) : void {
        let workingDays = Object[7];
        workingDays = extend([], this.WorkingDaysObj.value, [], true);
        workingDays.push(args.item.innerText);
        this.ganttObj.workWeek = workingDays;
    }
    remove (args: RemoveEventArgs) : void {
        var index = this.ganttObj.workWeek.indexOf(args.item.innerText);
            let workingDays = Object[7];
            if (index !== -1) {
                workingDays = this.WorkingDaysObj.value;
                this.ganttObj.workWeek = workingDays;
            }
    }
    }
