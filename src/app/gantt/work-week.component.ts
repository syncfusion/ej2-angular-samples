import { Component, OnInit, ViewChild} from '@angular/core';
import { projectNewData } from './data';
import { extend } from '@syncfusion/ej2-base';
import { ChangeEventArgs, CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
import { DayMarkersService, GanttComponent, GanttModule, SelectionService } from '@syncfusion/ej2-angular-gantt';
import { SelectEventArgs, RemoveEventArgs  } from '@syncfusion/ej2-dropdowns';
import { MultiSelectAllModule, MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-ganttworkweek',
    templateUrl: 'work-week.html',
    standalone: true,
    providers: [SelectionService, DayMarkersService],
    imports: [SBActionDescriptionComponent, GanttModule, MultiSelectAllModule, SBDescriptionComponent, CheckBoxAllModule]
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
            parentID:'ParentID'
        };
        this.columns =  [
            { field: 'TaskID',visible: false, headerText: 'ID', width: 80 },
            { field: 'TaskName', headerText: 'Name', width: 280 },
            { field: 'StartDate' },
            { field: 'EndDate' },
            { field: 'Duration' },
            { field: 'Progress' },
            { field: 'Predecessor', headerText: 'Dependency' }
        ];
        this.splitterSettings = {
            columnIndex: 1
        },
        this.projectStartDate = new Date('03/26/2025');
        this.projectEndDate = new Date('07/20/2025');
        this.labelSettings = {
            leftLabel: 'TaskName',
        };
    }
    select(args: SelectEventArgs): void {
        if (!this.ganttObj || !this.WorkingDaysObj) {
            return;
        }
        const workingDays: string[] = Array.isArray(this.WorkingDaysObj.value) ? [...(this.WorkingDaysObj.value as string[])] : [];
        const selectedDay = args.item.innerText;
        if (selectedDay && !workingDays.includes(selectedDay)) {
            workingDays.push(selectedDay);
        }
        this.ganttObj.workWeek = workingDays;
    }

    remove(args: RemoveEventArgs): void {
        if (!this.ganttObj || !this.WorkingDaysObj) {
            return;
        }
        const workingDays: string[] = Array.isArray(this.WorkingDaysObj.value) ? [...(this.WorkingDaysObj.value as string[])] : [];
        const removedDay = args.item.innerText;
        const index = workingDays.indexOf(removedDay);
        if (index !== -1) {
            workingDays.splice(index, 1);
        }
        this.ganttObj.workWeek = workingDays;
    }
    private updateGanttProperty(property: 'showWeekend' | 'highlightWeekends', value: boolean): void {
        if (!this.ganttObj) {
            return;
        }
        if (property === 'showWeekend') {
            this.ganttObj.timelineSettings.showWeekend = value;
        } else {
            this.ganttObj.highlightWeekends = value;
        }
    }

    onshowWeekendsChange(args: ChangeEventArgs): void {
        this.updateGanttProperty('showWeekend', args.checked ?? false);
    }

    onHighlightWeekendsChange(args: ChangeEventArgs): void {
        this.updateGanttProperty('highlightWeekends', args.checked ?? false);
    }
}
