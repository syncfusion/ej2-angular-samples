import { Component, ViewEncapsulation } from '@angular/core';
import { ScheduleComponent, EventSettingsModel, CellTemplateArgs, getWeekNumber, TimelineMonthService, ResizeService, EventRenderedArgs }
    from '@syncfusion/ej2-angular-schedule';
import { headerRowData } from './datasource';
import { extend, Internationalization } from '@syncfusion/ej2-base';

/**
 * Sample for Schedule header rows
 */

@Component({
    selector: 'control-content',
    templateUrl: 'header-rows.html',
    providers: [TimelineMonthService, ResizeService]
})
export class HeaderRowsComponent {
    public scheduleObj: ScheduleComponent;
    public selectedDate: Date = new Date(2018, 0, 1);
    public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], headerRowData, null, true) };
    public monthInterval: number = 12;
    public instance: Internationalization = new Internationalization();

    getMonthDetails(value: CellTemplateArgs): string {
        return this.instance.formatDate((value as CellTemplateArgs).date, { skeleton: 'yMMMM' });
    }

    getWeekDetails(value: CellTemplateArgs): string {
        return 'Week ' + getWeekNumber((value as CellTemplateArgs).date);
    }

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

