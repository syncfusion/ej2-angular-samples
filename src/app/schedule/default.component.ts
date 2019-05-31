import { Component } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';
import { scheduleData } from './data';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService]
})
export class DefaultComponent {
    public selectedDate: Date = new Date(2019, 0, 10);
    public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], scheduleData, null, true) };
}