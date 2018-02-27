import { Component, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { View, EventSettingsModel, ActionEventArgs, EventRenderedArgs } from '@syncfusion/ej2-ng-schedule';
import { ScheduleComponent, MonthService, DayService, WeekService, WorkWeekService } from '@syncfusion/ej2-ng-schedule';
import { employeeEventData } from './datasource';

@Component({
    templateUrl: 'cell-dimension.html',
    styleUrls: ['cell-dimension.style.css'],
    providers: [MonthService, DayService, WeekService, WorkWeekService],
    encapsulation: ViewEncapsulation.None
})
export class CellDimensionComponent {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public data: object[] = <Object[]>extend([], employeeEventData, null, true);
    public currentView: View = 'Week';
    public selectedDate: Date = new Date(2018, 1, 15);
    public eventSettings: EventSettingsModel = { dataSource: this.data };
    public cssClass: string = 'schedule-cell-dimension';
    public showTimeIndicator: boolean = false;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['cell-dimension.style.css'];
    }

    dataBinding(): void {
        this.scheduleObj.adjustEventWrapper();
    }

    onActionComplete(args: ActionEventArgs): void {
        if (args.requestType === 'dateNavigate' || args.requestType === 'viewNavigate') {
            this.scheduleObj.adjustEventWrapper();
        }
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