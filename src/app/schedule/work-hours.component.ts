import { Component, ViewChild } from '@angular/core';
import { extend, Internationalization } from '@syncfusion/ej2-base';
import {
    ScheduleComponent, EventSettingsModel, View, WorkHoursModel, DayService, DragAndDropService,
    WeekService, WorkWeekService, MonthService, EventRenderedArgs, TimelineViewsService, TimelineMonthService, ResizeService
} from '@syncfusion/ej2-angular-schedule';
import { employeeEventData } from './data';
import { TimePickerComponent } from '@syncfusion/ej2-angular-calendars';

@Component({
    selector: 'control-content',
    templateUrl: 'work-hours.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService]
})
export class WorkHoursComponent {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public selectedDate: Date = new Date(2018, 1, 15);
    public data: Object[] = <Object[]>extend([], employeeEventData, null, true);
    public eventSettings: EventSettingsModel = { dataSource: this.data };
    public workHours: WorkHoursModel = { start: '08:00', end: '20:00' };
    public currentView: View = 'Week';
    public startdate: Object = new Date(2000, 0, 1, 8);
    public enddate: Object = new Date(2000, 0, 1, 20);
    @ViewChild('startTime')
    public startTimeObj: TimePickerComponent;
    @ViewChild('endTime')
    public endTimeObj: TimePickerComponent;
    public instance: Internationalization = new Internationalization();
    onSubmit(): void {
        this.scheduleObj.workHours.start = this.instance.formatDate(this.startTimeObj.value, { skeleton: 'Hm' });
        this.scheduleObj.workHours.end = this.instance.formatDate(this.endTimeObj.value, { skeleton: 'Hm' });
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