import { Component, ViewChild } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-ng-calendars';
import { ScheduleComponent } from '@syncfusion/ej2-ng-schedule';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-ng-schedule';
import { scheduleData } from './datasource';


@Component({
    templateUrl: 'default.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService]
})
export class DefaultComponent {
    public selectedDate: Date = new Date(2018, 1, 15);
    public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], scheduleData, null, true) };
    @ViewChild('schedule')
    public schedule: ScheduleComponent;

    onDateChange(args: ChangeEventArgs): void {
        this.schedule.selectedDate = args.value;
    }
}