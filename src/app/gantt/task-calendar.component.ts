import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttComponent, GanttModule, ToolbarService, SelectionService, DayMarkersService, EditService } from '@syncfusion/ej2-angular-gantt';
import { NumericTextBoxComponent, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ploMeetingsData } from './data';

@Component({
    selector: 'ej2-task-calendar',
    templateUrl: 'task-calendar.html',
    standalone: true,
    imports: [ CommonModule, GanttModule, NumericTextBoxModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent ],
    providers: [ ToolbarService, SelectionService, DayMarkersService, EditService]
})
export class GanttTaskCalendarComponent implements OnInit {
    @ViewChild('ganttObj')
    public ganttObj: GanttComponent;
    @ViewChild('hoursInput')
    public hoursInput: NumericTextBoxComponent;
    public data: object[];
    public hours: number | null = 8;
    public warning: string = '';
    public taskSettings: object;
    public toolbar: string[];
    public editSettings: object;
    public splitterSettings: object;
    public labelSettings: object;
    public timelineSettings: object;
    public calendarSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;

    public ngOnInit(): void {
        this.data = ploMeetingsData;
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks',
            calendarId: 'calendar'
        };
        this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Search', 'PrevTimeSpan', 'NextTimeSpan'];
        this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        };
        this.splitterSettings = {
            columnIndex: 3
        };
        this.labelSettings = {
            rightLabel: 'TaskName',
            taskLabel: 'Progress'
        };
        this.timelineSettings = {
            topTier: {
                unit: 'Week',
                format: 'MM/dd/yyyy'
            },
            bottomTier: {
                unit: 'Day',
                count: 1
            }
        };
        this.calendarSettings = {
            projectCalendar: {
                workingTime: [
                    { from: 8, to: 12 },
                    { from: 13, to: 17 }
                ],
                holidays: [
                    {
                        from: '07/06/2026',
                        to: '07/06/2026',
                        label: 'Company Foundation Day'
                    }
                ],
                exceptions: [
                    {
                        from: '07/05/2026',
                        to: '07/05/2026',
                        label: 'Extended Work Day'
                    }
                ]
            },
            taskCalendars: [
                {
                    calendarId: 'Steering-committee',
                    holidays: [
                        {
                            from: '07/07/2026',
                            to: '07/07/2026',
                            label: 'SC Strategy Day'
                        },
                        {
                            from: '07/22/2026',
                            to: '07/22/2026',
                            label: 'Board Offsite'
                        }
                    ],
                    exceptions: [
                        {
                            from: '07/05/2026',
                            to: '07/05/2026',
                            label: 'Compensatory Working'
                        },
                        {
                            from: '07/19/2026',
                            to: '07/19/2026',
                            label: 'Compensatory Working'
                        }
                    ]
                },
                {
                    calendarId: 'Tech-review',
                    holidays: [
                        {
                            from: '07/16/2026',
                            to: '07/17/2026',
                            label: 'Architecture Review Freeze'
                        }
                    ],
                    exceptions: [
                        {
                            from: '07/26/2026',
                            to: '07/26/2026',
                            label: 'Extra Review Slot'
                        }
                    ]
                },
                {
                    calendarId: 'Compliance-audit',
                    holidays: [
                        {
                            from: '07/09/2026',
                            to: '07/10/2026',
                            label: 'Compliance Blackout'
                        }
                    ],
                    exceptions: [
                        {
                            from: '07/25/2026',
                            to: '07/25/2026',
                            label: 'Mandatory Audit Working Day'
                        }
                    ]
                }
            ]
        };
        this.projectStartDate = new Date('07/01/2026');
        this.projectEndDate = new Date('08/31/2026');
    }

    public onHoursChange(args: any): void {
        const val = args.value as number | null;
        const warningMessage = 'Hours per day value must be greater than 1 and less than 24.';
        if (val == null) {
            this.warning = warningMessage;
            return;
        }
        if (val < 1 || val > 24) {
            this.warning = warningMessage;
            return;
        }
        this.hours = val;
        this.warning = '';
    }

    public updateHours(): void {
        const inputValue = this.hoursInput && this.hoursInput.value != null ? Number(this.hoursInput.value) : this.hours;
        const warningMessage = 'Hours per day value must be greater than 1 and less than 24.';
        if (inputValue == null || inputValue < 1 || inputValue > 24) {
            this.warning = warningMessage;
            return;
        }
        this.warning = '';
        this.hours = inputValue;
        if (this.ganttObj) {
            this.ganttObj.hoursPerDay = inputValue;
        }
    }
}