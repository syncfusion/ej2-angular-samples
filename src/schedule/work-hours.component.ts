import { Component, ViewChild } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { ScheduleComponent, EventSettingsModel, View, WorkHoursModel } from '@syncfusion/ej2-ng-schedule';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, EventRenderedArgs } from '@syncfusion/ej2-ng-schedule';
import { employeeEventData } from './datasource';

@Component({
    templateUrl: 'work-hours.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService]
})
export class WorkHoursComponent {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public selectedDate: Date = new Date(2018, 1, 15);
    public data: Object[] = <Object[]>extend([], employeeEventData, null, true);
    public eventSettings: EventSettingsModel = { dataSource: this.data };
    public workHours: WorkHoursModel = { highlight: true, start: '11:00', end: '20:00' };
    public currentView: View = 'Week';
    public startdate: Object = new Date(2000, 0, 1, 6);
    public enddate: Object = new Date(2000, 0, 1, 18);
    onSubmit(): void {
        let start: HTMLInputElement = document.getElementById('startTime') as HTMLInputElement;
        let end: HTMLInputElement = document.getElementById('endTime') as HTMLInputElement;
        this.scheduleObj.workHours.start = start.value;
        this.scheduleObj.workHours.end = end.value;
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