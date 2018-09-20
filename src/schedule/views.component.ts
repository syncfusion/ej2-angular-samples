import { Component, ViewChild } from '@angular/core';
import { zooEventsData } from './datasource';
import { extend } from '@syncfusion/ej2-base';
import {
    ScheduleComponent, EventSettingsModel, View, EventRenderedArgs, DayService, WeekService, WorkWeekService, MonthService, ResizeService
} from '@syncfusion/ej2-angular-schedule';

@Component({
    selector: 'control-content',
    templateUrl: 'views.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, ResizeService]
})
export class ViewsComponent {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public selectedDate: Date = new Date(2018, 1, 15);
    public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], zooEventsData, null, true) };
    public scheduleView: View = 'Week';
    public datas: string[] = ['Day', 'Week', 'WorkWeek', 'Month'];

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