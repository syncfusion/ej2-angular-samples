import { Component, ViewChild } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import {
    EventSettingsModel, EventRenderedArgs, ScheduleComponent, DayService, WeekService,
    WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { scheduleData } from './data';

@Component({
    selector: 'control-content',
    templateUrl: 'editor-validation.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService]
})
export class EditorValidationComponent {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public data: Object[] = <Object[]>extend([], scheduleData, null, true);
    public selectedDate: Date = new Date(2019, 0, 10);
    public eventSettings: EventSettingsModel = {
        dataSource: this.data,
        fields: {
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