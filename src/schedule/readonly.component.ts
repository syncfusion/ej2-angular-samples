import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { readonlyEventsData } from './datasource';
import { extend } from '@syncfusion/ej2-base';
import { View, EventSettingsModel, EventClickArgs, PopupOpenEventArgs, EventRenderedArgs } from '@syncfusion/ej2-ng-schedule';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-ng-schedule';

@Component({
    templateUrl: 'readonly.html',
    styles: [`
    .e-schedule .e-read-only {
        opacity: .8;
    }`],
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
    encapsulation: ViewEncapsulation.None
})
export class ReadOnlyComponent implements OnInit {
    public data: object[] = <Object[]>extend([], readonlyEventsData, null, true);
    public eventSettings: EventSettingsModel;
    public currentView: View;

    ngOnInit(): void {
        this.data = this.data;
        this.eventSettings = { dataSource: this.data };
        this.currentView = 'Week';
    }

    isReadOnly(dataObj: Object): boolean {
        let data: { [key: string]: Object } = dataObj as { [key: string]: Object };
        return data.ReadOnly as boolean || (data.EndTime < new Date());
    }

    onEventClick(args: EventClickArgs): void {
        if ((args.element as HTMLElement).classList.contains('e-read-only')) {
            args.cancel = true;
        }
    }
    onPopupOpen(args: PopupOpenEventArgs): void {
        if (args.type === 'Editor' && this.isReadOnly(args.data)) {
            args.cancel = true;
        }
    }
    onEventRendered(args: EventRenderedArgs): void {
        if (this.isReadOnly(args.data)) {
            args.element.setAttribute('aria-readonly', 'true');
            args.element.classList.add('e-read-only');
        }
    }
}