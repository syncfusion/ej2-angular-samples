import { Component, ViewChild } from '@angular/core';
import { fifaEventsData } from './data';
import { extend } from '@syncfusion/ej2-base';
import {
    EventSettingsModel, EventRenderedArgs, ScheduleComponent, MonthService, DayService, WeekService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';

@Component({
    selector: 'control-content',
    templateUrl: 'extended-views.html',
    providers: [MonthService, DayService, WeekService, ResizeService, DragAndDropService]
})
export class ExtendedViewsComponent {
    public data: Object[] = <Object[]>extend([], fifaEventsData, null, true);
    public selectedDate: Date = new Date(2018, 5, 21);
    public eventSettings: EventSettingsModel = { dataSource: this.data };
    public isSelected: Boolean = true;
    public dayInterval: number = 3;
    public weekInterval: number = 2;
    public monthInterval: number = 4;
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;

    onEventRendered(args: EventRenderedArgs): void {
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