import { Component } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService } from '@syncfusion/ej2-angular-schedule';
import { scheduleData } from './datasource';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService]
})
export class DefaultComponent {
    public selectedDate: Date = new Date(2018, 1, 15);
    public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], scheduleData, null, true) };
}