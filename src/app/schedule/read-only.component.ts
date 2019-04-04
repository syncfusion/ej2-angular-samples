import { Component, ViewEncapsulation } from '@angular/core';
import { readonlyEventsData } from './data';
import { extend } from '@syncfusion/ej2-base';
import {
    View, EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';

@Component({
    selector: 'control-content',
    templateUrl: 'read-only.html',
    styles: [`
    .e-schedule .e-read-only {
        opacity: .8;
    }`],
    providers: [DayService, WeekService, WorkWeekService, MonthService, ResizeService, DragAndDropService],
    encapsulation: ViewEncapsulation.None
})
export class ReadOnlyComponent {
    public data: object[] = <Object[]>extend([], readonlyEventsData, null, true);
    public eventSettings: EventSettingsModel = { dataSource: this.data };
    public currentView: View = 'Week';
}
