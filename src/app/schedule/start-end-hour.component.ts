import { Component, ViewChild } from '@angular/core';
import { TimePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { extend, Internationalization } from '@syncfusion/ej2-base';
import {
    ScheduleComponent, EventSettingsModel, View, WorkHoursModel, DayService,
    WeekService, EventRenderedArgs, TimelineViewsService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { employeeEventData } from './data';

@Component({
    selector: 'control-content',
    templateUrl: 'start-end-hour.html',
    providers: [DayService, WeekService, TimelineViewsService, ResizeService, DragAndDropService]
})
export class StartEndHourComponent {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    @ViewChild('ejStartTimePicker')
    public ejStartTimePicker: TimePickerComponent;
    @ViewChild('ejEndTimePicker')
    public ejEndTimePicker: TimePickerComponent;
    public instance: Internationalization = new Internationalization();
    public selectedDate: Date = new Date(2018, 1, 15);
    public data: object[] = <Object[]>extend([], employeeEventData, null, true);
    public eventSettings: EventSettingsModel = { dataSource: this.data };
    public currentView: View = 'Week';
    public workHours: WorkHoursModel = { highlight: false };
    public startdate: Object = new Date(2000, 0, 1, 8);
    public enddate: Object = new Date(2000, 0, 1, 20);
    public startHour: string = '08:00';
    public endHour: string = '20:00';

    onSubmit(): void {
        this.scheduleObj.startHour = this.instance.formatDate(this.ejStartTimePicker.value, { skeleton: 'Hm' });
        this.scheduleObj.endHour = this.instance.formatDate(this.ejEndTimePicker.value, { skeleton: 'Hm' });
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