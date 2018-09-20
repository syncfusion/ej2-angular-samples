import { Component, ViewEncapsulation } from '@angular/core';
import { readonlyEventsData } from './datasource';
import { extend } from '@syncfusion/ej2-base';
import {
    View, EventSettingsModel, EventClickArgs, PopupOpenEventArgs,
    EventRenderedArgs, DayService, WeekService, WorkWeekService, MonthService, ResizeService, ResizeEventArgs
} from '@syncfusion/ej2-angular-schedule';

@Component({
    selector: 'control-content',
    templateUrl: 'read-only.html',
    styles: [`
    .e-schedule .e-read-only {
        opacity: .8;
    }`],
    providers: [DayService, WeekService, WorkWeekService, MonthService, ResizeService],
    encapsulation: ViewEncapsulation.None
})
export class ReadOnlyComponent {
    public data: object[] = <Object[]>extend([], readonlyEventsData, null, true);
    public eventSettings: EventSettingsModel = { dataSource: this.data };
    public currentView: View = 'Week';

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
        if ((args.type === 'Editor' && this.isReadOnly(args.data)) ||
            (args.type === 'DeleteAlert' && this.isReadOnly((args.data as any).event))) {
            args.cancel = true;
        }
    }
    onEventRendered(args: EventRenderedArgs): void {
        if (this.isReadOnly(args.data)) {
            args.element.setAttribute('aria-readonly', 'true');
            args.element.classList.add('e-read-only');
        }
    }

    onResizeStart(args: ResizeEventArgs): void {
        if ((args.element as HTMLElement).classList.contains('e-read-only')) {
            args.cancel = true;
        }
    }
}