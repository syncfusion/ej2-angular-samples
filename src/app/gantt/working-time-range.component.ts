import { Component, OnInit, ViewChild} from '@angular/core';
import { WorkingTimeRangeData } from './data';
import { ChangeEventArgs} from '@syncfusion/ej2-angular-inputs';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { GanttComponent } from '@syncfusion/ej2-angular-gantt';
import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';

@Component({
    selector: 'ej2-ganttworkingtimerange',
    templateUrl: 'working-time-range.html'
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

    @ViewChild('ganttObj')
    public ganttObj: GanttComponent;
    @ViewChild('StartTimeObj')
    public StartTimeObj: NumericTextBoxComponent;
    @ViewChild('EndTimeObj')
    public EndTimeObj: NumericTextBoxComponent;    

    public ngOnInit(): void {
        this.data = WorkingTimeRangeData;
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
        this.projectStartDate = new Date('04/02/2019');
        this.projectEndDate = new Date('07/06/2019');
        this.labelSettings = {
            leftLabel: 'TaskName',
        };
    }
    
    updateTime (e: ChangeEventArgs) : void {
        var defaultDate = "08/08/2016", startDate = new Date(defaultDate), endDate = new Date(defaultDate);
        var decPlace =  this.StartTimeObj.value - Math.floor(this.StartTimeObj.value);
        startDate.setHours(this.StartTimeObj.value);
        startDate.setMinutes(decPlace * 60);
        decPlace = this.EndTimeObj.value - Math.floor(this.EndTimeObj.value);
        endDate.setHours(this.EndTimeObj.value);
        endDate.setMinutes(decPlace * 60);
       
        /*Validate time value and update the time range*/
        if (startDate.getTime() < endDate.getTime() && this.isTimeUpdated == false) {
            var workingTime = [{ from: this.StartTimeObj.value, to: this.EndTimeObj.value }];
            this.ganttObj.dayWorkingTime = workingTime;
            this.isTimeUpdated = false;
        }
        else {
            this.isTimeUpdated = true;
            this.StartTimeObj.value = this.ganttObj.dayWorkingTime[0].from;
            this.EndTimeObj.value = this.ganttObj.dayWorkingTime[this.ganttObj.dayWorkingTime.length - 1].to;
        }
        this.isTimeUpdated = false;
    }   
    }
