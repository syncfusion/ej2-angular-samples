import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { extend } from '@syncfusion/ej2-base';
import { MultiSelectChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import {
    ScheduleComponent, EventSettingsModel, View, DayService, WeekService, MonthService,
    EventRenderedArgs, TimelineViewsService, TimelineMonthService, WorkHoursModel, ResizeService, DragAndDropService
}
    from '@syncfusion/ej2-angular-schedule';
import { employeeEventData } from './data';

/**
 * Sample for Schedule hide weekend
 */
@Component({
    selector: 'control-content',
    templateUrl: 'hide-weekend.html',
    styles: ['hide-weekend.css'],
    providers: [DayService, WeekService, MonthService, TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService],
    encapsulation: ViewEncapsulation.None

})
export class HideWeekEndComponent {
    public selectedDate: Date = new Date(2018, 1, 15);
    public data: object[] = <Object[]>extend([], employeeEventData, null, true);
    public eventSettings: EventSettingsModel = { dataSource: this.data };
    public workDays: number[] = [1, 3, 4, 5];
    public workHours: WorkHoursModel = { start: '08:00' };
    public showWeekend: boolean = false;
    public currentView: View = 'Week';

    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    @ViewChild('toggleBtn')
    public toggleBtn: ButtonComponent;

    public workDaysData: { [key: string]: Object; }[] = [
        { Name: 'Sunday', Value: '0' },
        { Name: 'Monday', Value: '1' },
        { Name: 'Tuesday', Value: '2' },
        { Name: 'Wednesday', Value: '3' },
        { Name: 'Thursday', Value: '4' },
        { Name: 'Friday', Value: '5' },
        { Name: 'Saturday', Value: '6' }
    ];
    public workDaysFields: Object = { text: 'Name', value: 'Value' };
    public workDaysValue: string[] = ['1', '3', '4', '5'];

    onMultiSelectChange(args: MultiSelectChangeEventArgs): void {
        let value: number[] = (args.value as number[]).slice(0).map(Number).sort();
        this.scheduleObj.workDays = value.length === 0 ? [0] : value;
        this.scheduleObj.dataBind();
    }

    btnClick(): void {
        if (this.toggleBtn.element.classList.contains('e-active')) {
            this.scheduleObj.showWeekend = true;
            this.toggleBtn.content = 'Hide';
            this.scheduleObj.dataBind();
        } else {
            this.scheduleObj.showWeekend = false;
            this.toggleBtn.content = 'Show';
            this.scheduleObj.dataBind();
        }
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