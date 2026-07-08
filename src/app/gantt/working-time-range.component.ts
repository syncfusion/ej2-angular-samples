import { Component, OnInit, ViewChild} from '@angular/core';
import { WorkingTimeRangeData } from './data';
import { ChangeEventArgs, NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DayMarkersService, GanttComponent, GanttModule, SelectionService } from '@syncfusion/ej2-angular-gantt';
import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { DropDownListComponent,DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'ej2-ganttworkingtimerange',
    templateUrl: 'working-time-range.html',
    standalone: true,
    providers: [SelectionService, DayMarkersService],
    imports: [SBActionDescriptionComponent, GanttModule, NumericTextBoxAllModule,ButtonAllModule,DropDownListAllModule, SBDescriptionComponent]
})
export class GanttWorkingTimeRangeComponent implements OnInit {

    public data: object[];
    public taskSettings: object;
    public splitterSettings: object;
    public columns: object[];
    public timelineSettings: object;
    public labelSettings: object;
    public isTimeUpdated: boolean = false;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public durationUnit: string;
    public workWeek: string;
    public dropDownData: Object;
    public dropDownFields: Object;

    @ViewChild('ganttObj')
    public ganttObj: GanttComponent;
    @ViewChild('StartTimeObj')
    public StartTimeObj: NumericTextBoxComponent;
    @ViewChild('EndTimeObj')
    public EndTimeObj: NumericTextBoxComponent;
    @ViewChild('StartTime')
    public StartTime: NumericTextBoxComponent;
    @ViewChild('EndTime')
    public EndTime: NumericTextBoxComponent;
    @ViewChild('WorkingDaysObj')
    public WorkingDaysObj: DropDownListComponent;

    public ngOnInit(): void {
        this.data = WorkingTimeRangeData;
        this.dropDownFields = { text: 'day', value: 'id'};
        this.dropDownData= [ 
        { id: 'Monday', day: 'Monday' },
        { id: 'Tuesday', day: 'Tuesday' },
        { id: 'Wednesday', day: 'Wednesday' },
        { id: 'Thursday', day: 'Thursday' },
        { id: 'Friday', day: 'Friday' },
        ];
        this.workWeek = 'Monday';
        this.durationUnit = 'Hour';
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
        this.columns = [
            { field: 'TaskID', visible: false },
            { field: 'TaskName',headerText: 'Name', width: 280 },
            { field: 'StartDate' },
            { field: 'EndDate' },
            { field: 'Duration' },
            { field: 'Predecessor' },
            { field: 'Progress' }
        ];
        this.splitterSettings = {
            columnIndex: 1
        },
        this.timelineSettings = {
            topTier: {
                unit: 'Day',
            },
            bottomTier: {
                unit: 'Hour',
            },
        };
        this.projectStartDate = new Date('04/02/2025');
        this.projectEndDate = new Date('04/15/2025');
        this.labelSettings = {
            leftLabel: 'TaskName',
        };
    }
    private validateTimeRange(startInput: NumericTextBoxComponent, endInput: NumericTextBoxComponent): void {
        if (startInput.value !== null && endInput.value !== null) {
            if (startInput.value >= endInput.value) {
                endInput.value = startInput.value < 24 ? startInput.value + 1.0 : 0.0;
            }
        }
    }

    change1(args: ChangeEventArgs): void {
        this.validateTimeRange(this.StartTimeObj, this.EndTimeObj);
    }

    change2(args: ChangeEventArgs): void {
        this.validateTimeRange(this.StartTime, this.EndTime);
    }
    select(args: any): void {
        if (!this.ganttObj?.weekWorkingTime || this.ganttObj.weekWorkingTime.length === 0) {
            return;
        }

        let startTime = 8;
        let endTime = 17;

        for (let i = 0; i < this.ganttObj.weekWorkingTime.length; i++) {
            if (this.ganttObj.weekWorkingTime[i].dayOfWeek === args?.item?.innerText) {
                startTime = this.ganttObj.weekWorkingTime[i].timeRange[0].from;
                endTime = this.ganttObj.weekWorkingTime[i].timeRange[0].to;
                break;
            }
        }

        if (this.StartTime) {
            this.StartTime.value = startTime;
        }
        if (this.EndTime) {
            this.EndTime.value = endTime;
        }
    }
    perform(): void {
        if (!this.WorkingDaysObj?.value || !this.ganttObj?.weekWorkingTime) {
            return;
        }

        let selectedDay = this.WorkingDaysObj.value;
        let startTime = this.StartTime?.value;
        let endTime = this.EndTime?.value;

        // Validate time range
        if (startTime === null || endTime === null || startTime < 0 || endTime > 24 || startTime >= endTime) {
            console.error('Invalid time range');
            return;
        }

        let workingTime = [];
        let weekWorkingTime = this.ganttObj.weekWorkingTime;
        let isUpdated = false;

        // Copy existing working times
        for (let i = 0; i < weekWorkingTime.length; i++) {
            workingTime.push({ dayOfWeek: weekWorkingTime[i].dayOfWeek, timeRange: weekWorkingTime[i].timeRange });
        }

        // Update or add the selected day's working time
        for (let i = 0; i < workingTime.length; i++) {
            if (workingTime[i].dayOfWeek === selectedDay) {
                workingTime[i].timeRange = [{ from: startTime, to: endTime }];
                isUpdated = true;
                break;
            }
        }

        if (!isUpdated) {
            workingTime.push({ dayOfWeek: selectedDay, timeRange: [{ from: startTime, to: endTime }] });
        }

        this.ganttObj.weekWorkingTime = workingTime;
    }
    update(): void {
        if (!this.ganttObj) {
            return;
        }

        let startTime = this.StartTimeObj?.value;
        let endTime = this.EndTimeObj?.value;

        // Validate time range
        if (startTime === null || endTime === null || startTime < 0 || endTime > 24 || startTime >= endTime) {
            console.error('Invalid time range');
            return;
        }

        let workingTime = [{ from: startTime, to: endTime }];
        this.ganttObj.dayWorkingTime = workingTime;
    }
    }
