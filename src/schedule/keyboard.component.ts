import { Component, ViewChild } from '@angular/core';
import { scheduleData } from './datasource';
import { extend } from '@syncfusion/ej2-base';
import { ScheduleComponent, EventSettingsModel, EventRenderedArgs } from '@syncfusion/ej2-ng-schedule';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-ng-schedule';


@Component({
    templateUrl: 'keyboard.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService]
})
export class KeyboardComponent {
    public data: object[] = <Object[]>extend([], scheduleData, null, true);
    public selectedDate: Date = new Date(2018, 1, 15);;
    public eventSettings: EventSettingsModel = { dataSource: this.data };;

    constructor() {
        document.body.addEventListener('keydown', (e: KeyboardEvent) => {
            let scheduleElement: HTMLElement = document.getElementById('Schedule');
            if (e.altKey && e.keyCode === 74 && scheduleElement) {
                scheduleElement.focus();
            }
        });
    }

    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;

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