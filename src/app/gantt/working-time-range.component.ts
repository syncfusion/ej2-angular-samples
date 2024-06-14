import { Component, OnInit, ViewChild} from '@angular/core';
import { WorkingTimeRangeData } from './data';
import { ChangeEventArgs, NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { GanttComponent, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { DropDownListComponent,DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'ej2-ganttworkingtimerange',
    templateUrl: 'working-time-range.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, NumericTextBoxAllModule,ButtonAllModule,DropDownListAllModule, SBDescriptionComponent]
})
export class GanttWorkingTimeRangeComponent implements OnInit {

    public data: object[];
    public taskSettings: object;
    public splitterSettings: object;
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
        this.splitterSettings = {
            columnIndex: 2
        },
        this.timelineSettings = {
            topTier: {
                unit: 'Day',
            },
            bottomTier: {
                unit: 'Hour',
            },
        };
        this.projectStartDate = new Date('04/02/2024');
        this.projectEndDate = new Date('07/06/2024');
        this.labelSettings = {
            leftLabel: 'TaskName',
        };
    }
   change1(args: any) : void {
        if (this.StartTimeObj.value >= this.EndTimeObj.value) {
            if(this.StartTimeObj.value < 24) {
               this.EndTimeObj.value = this.StartTimeObj.value + 1.00;
            }
            else {
                this.EndTimeObj.value = 0.00;
            }
        }
    }
    change2(args: any) : void {
        if (this.StartTime.value >= this.EndTime.value) {
            if(this.StartTime.value < 24) {
               this.EndTime.value = this.StartTime.value + 1.00;
            }
            else {
                this.EndTime.value = 0.00;
            }
        } 
    }
    select (args: any) : void {
        var startTime = 8;
            var endTime = 17;
            for(let i=0;i<this.ganttObj.weekWorkingTime.length;i++) {
                if(this.ganttObj.weekWorkingTime[i].dayOfWeek === args.item.innerText) {
                    startTime = this.ganttObj.weekWorkingTime[i].timeRange[0].from;
                    endTime = this.ganttObj.weekWorkingTime[i].timeRange[0].to;
                    break;
                }
            }
            this.StartTime.value = startTime;
            this.EndTime.value = endTime;
    }
    perform () : void {
        let selectedDay = this.WorkingDaysObj.value;
        let startTime = this.StartTime.value;
        let endTime = this.EndTime.value;
        let workingTime = [];
        let weekWorkingTime = this.ganttObj.weekWorkingTime;
        let isUpdated = false;
        for (let i = 0; i < weekWorkingTime.length; i++) {
            workingTime.push({ dayOfWeek: weekWorkingTime[i].dayOfWeek, timeRange: weekWorkingTime[i].timeRange });
        }
        for (let i = 0; i < workingTime.length; i++) {
            if (workingTime[i].dayOfWeek === selectedDay) {
                workingTime[i].dayOfWeek = workingTime[i].dayOfWeek;
                workingTime[i].timeRange = [{ from: startTime, to: endTime }]
                isUpdated = true;
                break;
            }
        }
        if (!isUpdated) {
            workingTime.push({ dayOfWeek: selectedDay, timeRange: [{ from: startTime, to: endTime }] });
        }
        this.ganttObj.weekWorkingTime = workingTime;
    }
    update () : void {
        let startTime = this.StartTimeObj.value;
        let endTime = this.EndTimeObj.value;
        let workingTime = [{ from: startTime, to: endTime }];
        this.ganttObj.dayWorkingTime = workingTime;
    }
    }
