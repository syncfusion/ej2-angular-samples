import { Component } from '@angular/core';
import {
    ScheduleComponent, EventSettingsModel, View, TimelineMonthService,
    ResizeService, EventRenderedArgs, DragAndDropService, CellTemplateArgs, getWeekNumber
} from '@syncfusion/ej2-angular-schedule';
import { headerRowData } from './data';
import { extend, Internationalization } from '@syncfusion/ej2-base';

/**
 * Sample for Schedule header rows
 */

@Component({
    selector: 'control-content',
    templateUrl: 'header-rows.html',
    providers: [TimelineMonthService, ResizeService, DragAndDropService]
})
export class HeaderRowsComponent {
    public scheduleObj: ScheduleComponent;
    public selectedDate: Date = new Date(2018, 0, 1);
    public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], headerRowData, null, true) };
    public monthInterval: Number = 12;
    public currentView: View = 'TimelineMonth';
    public instance: Internationalization = new Internationalization();
    getMonthDetails(value: CellTemplateArgs): string {
        return this.instance.formatDate((value as CellTemplateArgs).date, { skeleton: 'yMMMM' });
    }

    getWeekDetails(value: CellTemplateArgs): string {
        return 'Week ' + getWeekNumber((value as CellTemplateArgs).date);
    }

    onEventRendered(args: EventRenderedArgs): void {
        const categoryColor: string = args.data.CategoryColor as string;
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

