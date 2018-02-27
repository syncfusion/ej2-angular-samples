import { Component, OnInit } from '@angular/core';
import { zooEventsData } from './datasource';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, View, EventRenderedArgs } from '@syncfusion/ej2-ng-schedule';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-ng-schedule';

@Component({
    templateUrl: 'local-data.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService]
})
export class LocalDataComponent implements OnInit {
    public data: Object[] = <Object[]>extend([], zooEventsData, null, true);
    public selectedDate: Date;
    public eventSettings: EventSettingsModel;
    public currentView: View;

    ngOnInit(): void {
        this.eventSettings = { dataSource: this.data };
        this.selectedDate = new Date(2018, 1, 15);
        this.currentView = 'Week';
    }
    oneventRendered(args: EventRenderedArgs): void {
        let categoryColor: string = args.data.CategoryColor as string;
        if (!args.element || !categoryColor) {
            return;
        }
        if (this.currentView === 'Agenda') {
            (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
        } else {
            args.element.style.backgroundColor = categoryColor;
        }
    }
}