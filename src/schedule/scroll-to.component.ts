import { Component, ViewChild } from '@angular/core';
import { scheduleData } from './datasource';
import { extend } from '@syncfusion/ej2-base';
import {
    ScheduleComponent, EventSettingsModel, View, DayService, WeekService, EventRenderedArgs, TimelineViewsService, ResizeService
} from '@syncfusion/ej2-angular-schedule';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-calendars';

@Component({
    selector: 'control-content',
    templateUrl: 'scroll-to.html',
    providers: [DayService, WeekService, TimelineViewsService, ResizeService]
})
export class ScrollTimeComponent {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public data: object[] = <Object[]>extend([], scheduleData, null, true);
    public selectedDate: Date = new Date(2018, 1, 15);
    public eventSettings: EventSettingsModel = { dataSource: this.data };
    public currentView: View = 'Week';
    public date: Object = new Date(2000, 0, 1, 9);

    /*Apply scroll to the schedule component*/
    onChange(args: ChangeEventArgs): void {
        this.scheduleObj.scrollTo(args.text);
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