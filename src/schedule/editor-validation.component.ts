import { Component, OnInit, ViewChild } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, EventRenderedArgs, ScheduleComponent } from '@syncfusion/ej2-ng-schedule';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-ng-schedule';
import { scheduleData } from './datasource';

@Component({
    templateUrl: 'editor-validation.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService]
})
export class EditorValidationComponent implements OnInit {
    public data: Object[] = [];
    public selectedDate: Date;
    public eventSettings: EventSettingsModel;

    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;

    ngOnInit(): void {
        this.data = <Object[]>extend([], scheduleData, null, true);
        this.eventSettings = {
            dataSource: this.data, fields: {
                subject: { name: 'Subject', validation: { required: true } },
                location: {
                    name: 'Location', validation: {
                        required: true,
                        regex: ['^[a-zA-Z0-9- ]*$', 'Special character(s) not allowed in this field']
                    }
                },
                description: {
                    name: 'Description', validation: {
                        required: true, minLength: 5, maxLength: 500
                    }
                },
                startTime: { name: 'StartTime', validation: { required: true } },
                endTime: { name: 'EndTime', validation: { required: true } }
            }
        };
        this.selectedDate = new Date(2018, 1, 15);

    }
    oneventRendered(args: EventRenderedArgs): void {
        let categoryColor: string = args.data.CategoryColor as string;
        if (!args.element || !categoryColor) {
            return;
        }
        if (this.scheduleObj.currentView === 'Agenda') {
            (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
        } else {
            args.element.style.backgroundColor = categoryColor;
        }
    }
}