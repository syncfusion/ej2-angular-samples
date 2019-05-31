import { Component, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import {
    View, EventSettingsModel, EventRenderedArgs, ScheduleComponent, MonthService, DayService,
    WeekService, WorkWeekService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { employeeEventData } from './data';

@Component({
    selector: 'control-content',
    templateUrl: 'cell-dimension.html',
    styleUrls: ['cell-dimension.style.css'],
    providers: [MonthService, DayService, WeekService, WorkWeekService, ResizeService, DragAndDropService],
    encapsulation: ViewEncapsulation.None
})
export class CellDimensionComponent {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public data: object[] = <Object[]>extend([], employeeEventData, null, true);
    public currentView: View = 'Week';
    public selectedDate: Date = new Date(2018, 1, 15);
    public eventSettings: EventSettingsModel = { dataSource: this.data };
    public showTimeIndicator: boolean = false;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['cell-dimension.style.css'];
    }

    onEventRendered(args: EventRenderedArgs): void {
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