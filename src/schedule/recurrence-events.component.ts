import { Component, OnInit } from '@angular/core';
import { recurrenceData } from './datasource';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, EventRenderedArgs, View } from '@syncfusion/ej2-ng-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-ng-schedule';

@Component({
    templateUrl: 'recurrence-events.html',
    providers: [DayService, WeekService, MonthService]
})
export class RecurrenceComponent implements OnInit {
    public data: Object[] = <Object[]>extend([], recurrenceData, null, true);
    public selectedDate: Date;
    public eventSettings: EventSettingsModel;
    public currentView: View;

    ngOnInit(): void {
        this.eventSettings = { dataSource: this.data };
        this.selectedDate = new Date(2018, 1, 20);
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