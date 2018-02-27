import { Component, ViewChild } from '@angular/core';
import { TimePickerComponent } from '@syncfusion/ej2-ng-calendars';
import { extend } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-ng-buttons';
import { ScheduleComponent, EventSettingsModel, View, WorkHoursModel } from '@syncfusion/ej2-ng-schedule';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, EventRenderedArgs } from '@syncfusion/ej2-ng-schedule';
import { employeeEventData } from './datasource';


@Component({
    templateUrl: 'start-end-hour.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService]
})
export class StartEndHourComponent {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    @ViewChild('ejStartTimePicker')
    public ejStartTimePicker: TimePickerComponent;
    @ViewChild('ejEndTimePicker')
    public ejEndTimePicker: TimePickerComponent;
    public buttonObj: ButtonComponent;
    public selectedDate: Date = new Date(2018, 1, 15);
    public data: object[] = <Object[]>extend([], employeeEventData, null, true);
    public eventSettings: EventSettingsModel = { dataSource: this.data };
    public currentView: View = 'Week';
    public workHours: WorkHoursModel = { highlight: false };
    public startdate: Object = new Date(2000, 0, 1, 6);
    public enddate: Object = new Date(2000, 0, 1, 18);
    public startHour: string = '06:00';
    public endHour: string = '18:00';
    onSubmit(): void {
        let start: HTMLInputElement = document.getElementById('startTime') as HTMLInputElement;
        let end: HTMLInputElement = document.getElementById('endTime') as HTMLInputElement;
        this.scheduleObj.startHour = start.value;
        this.scheduleObj.endHour = end.value;
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