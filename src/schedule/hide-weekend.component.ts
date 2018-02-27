import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@syncfusion/ej2-ng-buttons';
import { extend } from '@syncfusion/ej2-base';
import { MultiSelectComponent, MultiSelectChangeEventArgs } from '@syncfusion/ej2-ng-dropdowns';
import { ScheduleComponent, EventSettingsModel, View } from '@syncfusion/ej2-ng-schedule';
import { DayService, WeekService, MonthService, EventRenderedArgs } from '@syncfusion/ej2-ng-schedule';
import { employeeEventData } from './datasource';

/**
 * Sample for Schedule hide weekend
 */
@Component({
    templateUrl: 'hide-weekend.html',
    styles: [` 
    .multi-prop div {
        padding-left: 0;
        padding-top: 0;
    }`],
    providers: [DayService, WeekService, MonthService],
    encapsulation: ViewEncapsulation.None

})
export class HideWeekEndComponent implements OnInit {
    public selectedDate: Date = new Date(2018, 1, 15);
    public data: object[] = <Object[]>extend([], employeeEventData, null, true);
    public eventSettings: EventSettingsModel = { dataSource: this.data };
    public currentView: View = 'Week';
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    @ViewChild('toggleBtn')
    public toggleBtn: ButtonComponent;
    @ViewChild('checkbox')
    public checkbox: MultiSelectComponent;

    public mode: string = 'CheckBox';
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

    ngOnInit(): void {
        this.scheduleObj.workDays = [1, 3, 4, 5];
        this.scheduleObj.showWeekend = false;
    }

    onMultiSelectChange(args: MultiSelectChangeEventArgs): void {
        let value: number[] = (args.value as number[]).slice(0).map(Number).sort();
        this.scheduleObj.workDays = value.length === 0 ? [0] : value;
        this.scheduleObj.dataBind();
    }

    btnClick() {
        if (this.toggleBtn.element.classList.contains('e-active')) {
            this.toggleBtn.content = 'Hide';
            this.scheduleObj.showWeekend = true;
        } else {
            this.toggleBtn.content = 'Show';
            this.scheduleObj.showWeekend = false;
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